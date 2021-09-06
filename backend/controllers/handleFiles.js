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

export const getAllFile = async (req, res) => {
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

        const userID = decoded.user.userID;
        // get list file of this user
        const listFile = await File.findAll({ 
            where: { userID } 
        });
        return res.status(200).json({ data: listFile });
    } catch(error) {
        return res.status(400).json({ message: error + ' '});
    };
};

// admin get all file of an user
export const getAllUserFile = async(req, res) => {
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

        // get all file of an user
        const { userID } = req.body;
        const listFile = await File.findAll({ 
            where: { userID } 
        });
        return res.status(200).json({ data: listFile });
    } catch(error) {
        return res.status(400).json({ message: error + ' '});
    };
};

// admin get all file in DB
export const getAllFileInDb = async(req, res) => {
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

        // get all file in DB
        const listFile = await File.findAll();
        return res.status(200).json({ data: listFile });
    } catch(error) {
        return res.status(400).json({ message: error + ' '});
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

export const insertFile = async (req, res) => {
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
            userID: decoded.user.userID,
            fileName: originalname,
        };

        await File.create(newFile);
        return res.status(201).json({ success: true })
    } catch(error) {
        res.status(400).json({ message: error + ' '});
    };
};

export const deleteFile = async (req, res) => {
    const fileID = req.body.fileID;
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

        // check if this is an admin or user, file exist or this user is the owner of the file
        let check = false;
        if(decoded.user.role === 1) {
            check = true;
        } else {
            const { userID } = decoded.user;
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
            return res.status(400).json({ message: 'File not found' });
        }

        // delete file
        await File.destroy({
            where: {
                fileID,
            }
        });
        return res.status(200).json({ success: true });
    } catch(error) {
        res.status(400).json({ message: error + ' ' });
    };
};

export const detailFile = async (req, res) => {
    const { fileID } = req.body;
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

        // check if this is an admin or user, file exist or this user is the owner of the file
        let check = false;
        if(decoded.user.role === 1) {
            check = true;
        } else {
            const userID = decoded.user.userID;
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
            return res.status(400).json({ message: 'File not found' });
        }

        // get file details
        const fileDetails = await File.findOne({
            where: {
                fileID,
            }
        });
        return res.status(200).json({ data: fileDetails });
    } catch(error) {
        res.status(400).json({ message: error + ' '});
    };
};

const downloadFromS3 = (fileKey) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };
    return s3.getObject(params).promise();
};

export const downloadFile = async (req, res) => {
    const fileID = req.body.fileID;
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
            return res.status(400).json({ message: 'File not found' });
        }

        // download file
        const { folder } = req.body;
        const { Body } = await downloadFromS3(selectFile.dataValues.fileKey);
        
        fs.writeFileSync(`${folder}/${selectFile.fileKey}`, Body);
        return res.status(200).json({ success: true });
    } catch(error) {
        res.status(400).json({ message: error + ' '});
    };
}