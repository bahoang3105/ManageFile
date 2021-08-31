require('dotenv/config');
const db = require('../models');
const File = db.files;
const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});

exports.getAllFile = async (req, res) => {
    try {
        //identity verification
        var token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({ success: false, message: "No token provided." });

        var tokenDecoded;
        jwt.verify(token, "secret", function(err, decoded) {
            if(err) {
                return res.status(500).json({ success: false, message: "Failed to authenticate token." });
            }
            tokenDecoded = decoded;
        });
        const userID = tokenDecoded.user.userID;

        // get list file of this user
        const listFile = await File.findAll({ userID: userID });
        return res.status(200).json({ success: true, data: listFile });
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

exports.insertFile = async (req, res) => {
    try {
        // identity verification
        var token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({ success: false, message: "No token provided." });

        var tokenDecoded;
        jwt.verify(token, "secret", function(err, decoded) {
            if(err) {
                return res.status(500).json({ success: false, message: "Failed to authenticate token." });
            }
            tokenDecoded = decoded;
        });

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

exports.deleteFile = async (req, res) => {
    try {
        // identity verification
        var token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({ success: false, message: "No token provided." });

        var tokenDecoded;
        jwt.verify(token, "secret", function(err, decoded) {
            if(err) {
                return res.status(500).json({ success: false, message: "Failed to authenticate token." });
            }
            tokenDecoded = decoded;
        });

        // check if user, file exist or this user is the owner of the file
        const userID = tokenDecoded.user.userID;
        const fileID = req.body.fileID;
        const selectFile = await File.findAll({
            where: {
                userId: userID,
                fileID: fileID,
            }
        });

        if(!selectFile) {
            return res.status(404).json({ success: false, message: "File not found." });
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

exports.detailFile = async (req, res) => {
    try {
        // identity verification
        var token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({ success: false, message: "No token provided." });

        var tokenDecoded;
        jwt.verify(token, "secret", function(err, decoded) {
            if(err) {
                return res.status(500).json({ success: false, message: "Failed to authenticate token." });
            }
            tokenDecoded = decoded;
        });

        // check if user, file exist or this user is the owner of the file
        const userID = tokenDecoded.user.userID;
        const fileID = req.body.fileID;
        const selectFile = await File.findAll({
            where: {
                userId: userID,
                fileID: fileID,
            }
        });

        if(!selectFile) {
            return res.status(404).json({ success: false, message: "File not found." });
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

exports.downloadFile = async (req, res) => {
    try {
        // identity verification
        var token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({ success: false, message: "No token provided." });

        var tokenDecoded;
        jwt.verify(token, "secret", function(err, decoded) {
            if(err) {
                return res.status(500).json({ success: false, message: "Failed to authenticate token." });
            }
            tokenDecoded = decoded;
        });

        // check if user, file exist or this user is the owner of the file
        const userID = tokenDecoded.user.userID;
        const fileID = req.body.fileID;
        const selectFile = await File.findOne({
            where: {
                userId: userID,
                fileID: fileID,
            }
        });

        if(!selectFile) {
            return res.status(404).json({ success: false, message: "File not found." });
        }

        // download file
        const folder = req.body.folder;
        const fileDownload = await downloadFromS3(selectFile.fileKey);
        
        fs.writeFileSync(`${folder}/${selectFile.fileKey}`, fileDownload.Body);
        
        return res.status(200).json({ success: true });
    } catch(error) {
        res.status(400).json({ success: false, message: error + " "});
    };
}