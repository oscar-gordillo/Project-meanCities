const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
  }

module.exports.login = function (req, res) {
    console.log("login");
    const username=req.body.username;
    const password=req.body.password;
    console.log("pwd",password);
    User.findOne({username:username}).exec(function(err,user){
        if (err) {
            console.log(err);
        }else{
            if (!user){

            }else{
                console.log(password);
                console.log(user.password);
                console.log(user);
                bcrypt.compare(password,user.password,function(err,passwordMatch){
                    if (err){
                        console.log(err);
                    }else{
                        if (passwordMatch) {
                            const token = generateAccessToken({ name: user.name });
                            res.status(200).json(token);
                        }else{
                            res.status(400).json('not match');
                        }
                    }
                });  
            }              
        }
    });
}

module.exports.addOne = function (req, res) {
    console.log("User AddOne request");
    const salt=bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(req.body.password,salt);
    const newUser = {
        name: req.body.name, username: req.body.username, password: hash
    };
    User.create(newUser, function (err, user) {
        const response = { status: process.env.OK_STATUS_CODE_INSERT, message: user };
        if (err) {
            console.log("Error creating user",err);
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}
