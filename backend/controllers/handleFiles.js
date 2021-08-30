require('dotenv/config');
const db = require('../models');
const File = db.files;
const User = db.users;
const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');

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

const uploadFile = async (file) => {
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

        await uploadFile(req.file);
        
        // insert file details into database
        const newFile = {
            userID: tokenDecoded.user.userID,
            fileName: req.file.originalname,
            fileType: fileType,
            size: size,
            date: date,
        };

        await File.create(newFile);
        
        // return res.status(200).send(fileUploaded);
        return res.status(200).json({ success: true })
    } catch(error) {
        res.status(400).json({ success: false, message: error + " "});
    };
};

exports.deleteFile = async (req, res) => {

};

exports.detailFile = async (req, res) => {

};