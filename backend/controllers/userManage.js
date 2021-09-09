import db from '../models';
import bcyptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = db.users;
const File = db.files;

export const getAllUser = async (req, res) => {
    try {
        //identity verification
        const token = req.headers['x-access-token'];
        let decoded;
        if(!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }
        jwt.verify(token, 'secret', (err, tokenDecoded) => {
            if(err) {
                return res.status(500).json({ message: 'Failed to authenticate token.' });
            }
            decoded = tokenDecoded;
        });
        if(decoded.user.role !== 1) {
            return res.status(401).json({ message: 'You are not an admin.'});
        }

        //get all user
        const listUser = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        return res.status(200).json({ data: listUser });
    } catch(error) {
        return res.status(400).json({ message: error + ' '});
    }
};

export const deleteUser = async (req, res) => {
    try {
        //identity verification
        const token = req.headers['x-access-token'];
        let decoded;
        if(!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }
        jwt.verify(token, 'secret', (err, tokenDecoded) => {
            if(err) {
                return res.status(500).json({ message: 'Failed to authenticate token.' });
            }
            decoded = tokenDecoded;
        });
        if(decoded.user.role !== 1) {
            return res.status(401).json({ message: 'You are not an admin.'});
        }
        console.log(1)
        // delete files of this user
        const { userID } = req.body;
        await File.destroy({
            where:{
                userID,
            }
        })
        console.log(2)
        // delete user
        await User.destroy({
            where: {
                userID,
            }
        });
        console.log(3);
        return res.status(200).json({ success: true });
    } catch(error) {
        return res.status(400).json({ message: error + ' '});
    }
};

export const resetPassUser = async (req, res) => {
    try {
        //identity verification
        const token = req.headers['x-access-token'];
        let decoded;
        if(!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }
        jwt.verify(token, 'secret', (err, tokenDecoded) => {
            if(err) {
                return res.status(500).json({ message: 'Failed to authenticate token.' });
            }
            decoded = tokenDecoded;
        });
        if(decoded.user.role !== 1) {
            return res.status(401).json({ message: 'You are not an admin.'});
        }

        //chang password of this user
        const userID = req.body.userID;
        const salt = await bcyptjs.genSalt(10);
        const hashPassword = await bcyptjs.hash('123456', salt);

        await User.update({ password: hashPassword }, {
            where: {
                userID,
            }
        });
        return res.status(200).json({ success: true });
    } catch(error) {
        return res.status(400).json({ message: error + ' '});
    }
};

export const upgradeToAdmin = async (req, res) => {
    try{
        //identity verification
        const token = req.headers['x-access-token'];
        let decoded;
        if(!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }
        jwt.verify(token, 'secret', (err, tokenDecoded) => {
            if(err) {
                return res.status(500).json({ message: 'Failed to authenticate token.' });
            }
            decoded = tokenDecoded;
        });
        if(decoded.user.role !== 1) {
            return res.status(401).json({ message: 'You are not an admin.'});
        }

        // check if this user exists
        const { userID } = req.body;
        const detailUser = await User.findOne({
            where: {
                userID,
            }
        });
        if(!detailUser) {
            return res.status(400).json({ message: 'User not found.'});
        }

        // upgrade this user to admin
        await User.update({ role: 1 }, {
            where: {
                userID,
            }
        });
        return res.status(200).json({ success: true });
    } catch(error) {
        return res.status(400).json({ message: error + ' '});
    }
}