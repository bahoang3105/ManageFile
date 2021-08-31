import 'dotenv/config';
import db from '../models';
import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import verifyIdentify from './verifyIdentity';

const File = db.files;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});

export const getAllFile = async (req, res) => {
    try {
        //identity verification
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }

        const userID = verify.tokenDecoded.user.userID;

        // get list file of this user
        const listFile = await File.findAll({ 
            where: { userID: userID } 
        });
        return res.status(200).json({ success: true, data: listFile });
    } catch(error) {
        res.status(400).json({ success: false, message: error + " "});
    };
};

// admin get all file of an user
export const getAllUserFile = async(req, res) => {
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

        // get all file of an user
        const userID = req.body.userID;
        const listFile = await File.findAll({ 
            where: { userID: userID } 
        });
        res.status(200).json({ success: true, data: listFile });
    } catch(error) {
        res.status(400).json({ success: false, message: error + " "});
    };
};

// admin get all file in DB
export const getAllFileInDb = async(req, res) => {
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

        // get all file in DB
        const listFile = await File.findAll();
        res.status(200).json({ success: true, data: listFile });
    } catch(error) {
        res.status(400).json({ success: false, message: error + " "});
    };
};

const uploadFile = (file) => {
    const myFile = file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: file.buffer,
    };
    return s3.upload(params).promise();
}

export const insertFile = async (req, res) => {
    try {
        //identity verification
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }

        const tokenDecoded = verify.tokenDecoded;

        // get file details
        let myFile = req.file.originalname.split(".");
        const fileType = myFile[myFile.length - 1];
        const size = req.file.size;
        const date = new Date();

        const fileUploaded = await uploadFile(req.file);
        const fileKey = fileUploaded.Key;
        
        // insert file details into database
        const newFile = {
            userID: tokenDecoded.user.userID,
            fileName: req.file.originalname,
            fileType: fileType,
            fileKey: fileKey,
            size: size,
            date: date,
        };

        await File.create(newFile);
        
        return res.status(201).json({ success: true })
    } catch(error) {
        res.status(400).json({ success: false, message: error + " "});
    };
};

export const deleteFile = async (req, res) => {
    const fileID = req.body.fileID;
    try {
        //identity verification
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }

        const tokenDecoded = verify.tokenDecoded;

        // check if this is an admin or user, file exist or this user is the owner of the file
        var check = false;
        if(tokenDecoded.user.role === 1) {
            check = true;
        } else {
            const userID = tokenDecoded.user.userID;
            const selectFile = await File.findAll({
                where: {
                    userId: userID,
                    fileID: fileID,
                }
            });

            if(selectFile) {
                check = true;
            }
        }
        if(!check) {
            return res.status(400).json({ success: false, message: "File not found" });
        }

        // delete file
        await File.destroy({
            where: {
                fileID: fileID,
            }
        });
        
        return res.status(200).json({ success: true });
    } catch(error) {
        res.status(400).json({ success: false, message: error + " "});
    };
};

export const detailFile = async (req, res) => {
    const fileID = req.body.fileID;
    try {
        //identity verification
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }

        const tokenDecoded = verify.tokenDecoded;

        // check if this is an admin or user, file exist or this user is the owner of the file
        var check = false;
        if(tokenDecoded.user.role === 1) {
            check = true;
        } else {
            const userID = tokenDecoded.user.userID;
            const selectFile = await File.findAll({
                where: {
                    userId: userID,
                    fileID: fileID,
                }
            });

            if(selectFile) {
                check = true;
            }
        }
        if(!check) {
            return res.status(400).json({ success: false, message: "File not found" });
        }

        // get file details
        const fileDetails = await File.findOne({
            where: {
                fileID: fileID,
            }
        });
        
        return res.status(200).json({ success: true, data: fileDetails });
    } catch(error) {
        res.status(400).json({ success: false, message: error + " "});
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
        var token = req.headers['x-access-token'];
        const verify = verifyIdentify(token);
        if(!verify.success) {
            return res.status(verify.status).json({ success: verify.success, message: verify.message });
        }

        const tokenDecoded = verify.tokenDecoded;

        // check if this is an admin or user, file exist or this user is the owner of the file
        var check = false;
        var selectFile;
        if(tokenDecoded.user.role === 1) {
            check = true;
            selectFile = await File.findOne({
                where: {
                    fileID: fileID,
                }
            });
        } else {
            const userID = tokenDecoded.user.userID;
            selectFile = await File.findOne({
                where: {
                    userId: userID,
                    fileID: fileID,
                }
            });

            if(selectFile) {
                check = true;
            }
        }
        if(!check) {
            return res.status(400).json({ success: false, message: "File not found" });
        }

        console.log(selectFile)

        // download file
        const folder = req.body.folder;
        const fileDownload = await downloadFromS3(selectFile.dataValues.fileKey);
        
        fs.writeFileSync(`${folder}/${selectFile.fileKey}`, fileDownload.Body);
        
        return res.status(200).json({ success: true });
    } catch(error) {
        res.status(400).json({ success: false, message: error + " "});
    };
}