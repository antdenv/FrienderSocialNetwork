const router = require("express").Router();
const UserModel = require('../models/userModel');
const bcrypt = require("bcrypt");

router.post('/register', async (req, res) => {
    try {
        // generate hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        
        // create user in database
        const newUser = await UserModel.create({
            login: req.body.login,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        // save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({where: {email: req.body.email}});
        !user && res.status(404).json('user not found');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json('wrong password');

        res.status(200).json(user);
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;