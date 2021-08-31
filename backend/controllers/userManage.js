import db from '../models';
import bcyptjs from 'bcryptjs';
import verifyIdentify from './verifyIdentity';

const User = db.users;

export const getAllUser = async (req, res) => {
    try {
        //identity verification
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }
        const tokenDecoded = verify.tokenDecoded;
        if(tokenDecoded.user.role !== 1) {
            return res.status(401).json({ success: false, message: "You are not an admin."});
        }

        //get all user
        const listUser = await User.findAll();
        return res.status(200).json({ success: true, data: listUser });
    } catch(error) {
        console.log(error + " ");
        return res.status(400).json({ success: false, message: error + " "});
    }
};

export const deleteUser = async (req, res) => {
    try {
        //identity verification
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }
        const tokenDecoded = verify.tokenDecoded;
        if(tokenDecoded.user.role !== 1) {
            return res.status(401).json({ success: false, message: "You are not an admin."});
        }

        // delete this user
        const userID = req.body.userID;
        await User.destroy({ where: { userID: userID } });
        return res.status(200).json({ success: true });
    } catch(error) {
        console.log(error + " ");
        return res.status(400).json({ success: false, message: error + " "});
    }
};

export const resetPassUser = async (req, res) => {
    try {
        //identity verification
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }
        const tokenDecoded = verify.tokenDecoded;
        if(tokenDecoded.user.role !== 1) {
            return res.status(401).json({ success: false, message: "You are not an admin."});
        }

        //chang password of this user
        const userID = req.body.userID;
        const salt = await bcyptjs.genSalt(10);
        const hashPassword = await bcyptjs.hash("123456", salt);

        await User.update({ password: hashPassword }, {
            where: {
                userID: userID,
            }
        });
        return res.status(200).json({ success: true });
    } catch(error) {
        console.log(error + " ");
        return res.status(400).json({ success: false, message: error + " "});
    }
};

export const detailUser = async (req, res) => {
    try{
        //identity verification
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }
        const tokenDecoded = verify.tokenDecoded;
        if(tokenDecoded.user.role !== 1) {
            return res.status(401).json({ success: false, message: "You are not an admin."});
        }

        // get details of this user
        const userID = req.body.userID;
        const detailUser = await User.findOne({
            where: {
                userID: userID,
            }
        });
        if(!detailUser) {
            return res.status(400).json({ success: false, message: "User not found."});
        }
        return res.status(200).json({ success: true, data: detailUser });
    } catch(error) {
        console.log(error + " ");
        return res.status(400).json({ success: false, message: error + " "});
    }
}

export const upgradeToAdmin = async (req, res) => {
    try{
        //identity verification
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }
        const tokenDecoded = verify.tokenDecoded;
        if(tokenDecoded.user.role !== 1) {
            return res.status(401).json({ success: false, message: "You are not an admin."});
        }

        // check if this user exists
        const userID = req.body.userID;
        const detailUser = await User.findOne({
            where: {
                userID: userID,
            }
        });
        if(!detailUser) {
            return res.status(400).json({ success: false, message: "User not found."});
        }

        // upgrade this user to admin
        await User.update({ role: 1 }, {
            where: {
                userID: userID,
            }
        });
        return res.status(200).json({ success: true });
    } catch(error) {
        console.log(error + " ");
        return res.status(400).json({ success: false, message: error + " "});
    }
}