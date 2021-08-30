const db = require('../models');
const User = db.users;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check if username exists 
        const usernameExists = await User.findOne({ where: { username: username } });
        if(usernameExists) {
            return res.status(400).json({ success: false, message: "Username existed"});
        }
        
        // create user
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        
        const newUser = {
            username: username,
            password: hashPassword,
        };

        // save 
        await User.create(newUser);
        newUser.password = undefined;

        return res.status(201).json({ success: true });
    } catch (err) {
        console.log(err + " ");
        return res.status(400).json({ success: false, message: err + " "});
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if(!user) {
            return res.status(400).json({ success: false, message: "Wrong username or password!"});
        }
        const checkPassword = await bcryptjs.compare(password, user.password);
        if(!checkPassword) {
            return res.status(400).json({ success: false, message: "Wrong username or password!"});
        }
        const payload = {
            userID: user.id,
            created: new Date(),
            user: user,
        };

        const token = await jwt.sign(payload, "secret", { expiresIn: "24h" });
        return res.json({ success: true, token: token });
    } catch(err) {
        console.log(err + " ");
        return res.status(400).json({ success: false, message: err + " "});
    }
};