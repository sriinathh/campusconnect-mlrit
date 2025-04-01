const express = require('express');
const User = require("../models/UserModel");
const userRouter = express.Router();
const jwt = require('jsonwebtoken');

userRouter.post('/register', async(req, res) =>{
    try {
        const {Username, email, password} req.body
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: " User already exists "});

        }
        const user = await User.create({
           username,
           email,
           password,
       

        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });

        }
    } catch (error) {
        res.status(400).json({ message:error.message});
    }



});