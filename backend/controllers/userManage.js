import db from '../models';
import bcyptjs from 'bcryptjs';

const User = db.users;
const File = db.files;

export const getAllUser = async (req, res, next) => {
    try{
        const listUser = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        return res.status(200).json({ data: listUser });
    } catch(error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        // delete files of this user
        const { userID } = req.body;
        await File.destroy({
            where:{
                userID,
            }
        })
        // delete user
        await User.destroy({
            where: {
                userID,
            }
        });
        return res.status(200).json({ success: true });
    } catch(error) {
        next(error);
    }
};

export const resetPassUser = async (req, res, next) => {
    try {
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
        next(error);
    }
};

export const upgradeToAdmin = async (req, res) => {
    try{
        
        // check if this user exists
        const { userID } = req.body;
        const detailUser = await User.findOne({
            where: {
                userID,
            }
        });
        if(!detailUser) {
            next(new Error('User not found'));
        }
        // upgrade this user to admin
        await User.update({ role: 1 }, {
            where: {
                userID,
            }
        });
        return res.status(200).json({ success: true });
    } catch(error) {
        next(error);
    }
}