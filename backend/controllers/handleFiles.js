import 'dotenv/config';
import db from '../models';
import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const File = db.files;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});

export const getAllFile = async (req, res, next) => {
    try {
        const { userID, role } = req.user;

        // if being admin
        if(role === 1) {
            const listFile = await File.findAll();
            return res.status(200).json({ data: listFile });
        }

        // get list file of this user
        const listFile = await File.findAll({ 
            where: { userID } 
        });
        return res.status(200).json({ data: listFile });
    } catch(error) {
        next(error);
    };
};

const uploadFile = ({ originalname, buffer }) => {
    const myFile = originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: buffer,
    };
    return s3.upload(params).promise();
}

export const insertFile = async (req, res, next) => {
    try {
        // get file details
        const { size, originalname } = req.file;
        const myFile = originalname.split('.');
        const fileType = myFile[myFile.length - 1];
        const date = new Date();

        const fileUploaded = await uploadFile(req.file);
        const fileKey = fileUploaded.Key;
        
        // insert file details into database
        const newFile = {
            fileType,
            fileKey,
            size,
            date,
            userID: req.user.userID,
            fileName: originalname,
        };

        const data = await File.create(newFile);
        const id = data.fileID;
        newFile.fileID = id;
        return res.status(201).json({ success: true, newFile })
    } catch(error) {
        next(error);
    };
};

export const deleteFile = async (req, res, next) => {
    const fileID = req.body.fileID;
    const { userID, role } = req.user;
    try {
        // check if this is an admin or user, file exist or this user is the owner of the file
        let check = false;
        if(role === 1) {
            check = true;
        } else {
            const selectFile = await File.findAll({
                where: {
                    userID,
                    fileID,
                }
            });

            if(selectFile) {
                check = true;
            }
        }
        if(!check) {
            next(new Error('File not found'));
        }

        // delete file
        await File.destroy({
            where: {
                fileID,
            }
        });
        return res.status(200).json({ success: true });
    } catch(error) {
        next(error);
    };
};

const downloadFromS3 = (fileKey) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };
    return s3.getObject(params).promise();
};

export const downloadFile = async (req, res, next) => {
    const { fileID, folder } = req.body;
    try {
        //identity verification
        const token = req.headers['x-access-token'];
        let decoded;
        if(!token) {
            next(new Error('No token provided'));
        }
        jwt.verify(token, 'secret', (err, tokenDecoded) => {
            if(err) {
                next(new Error('Failed to authenticate token'));
            }
            decoded = tokenDecoded;
        });

        // check if this is an admin or user, file exist or this user is the owner of the file
        let check = false;
        let selectFile;
        if(decoded.user.role === 1) {
            check = true;
            selectFile = await File.findOne({
                where: {
                    fileID,
                }
            });
        } else {
            const { userID } = decoded.user;
            selectFile = await File.findOne({
                where: {
                    userID,
                    fileID,
                }
            });

            if(selectFile) {
                check = true;
            }
        }
        if(!check) {
            next(new Error('File not found'));
        }

        // download file
        const { Body } = await downloadFromS3(selectFile.dataValues.fileKey);
        
        fs.writeFileSync(`${folder}/${selectFile.fileKey}`, Body);
        return res.status(200).json({ success: true });
    } catch(error) {
        next(error);
    };
}