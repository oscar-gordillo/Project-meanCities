const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const User = mongoose.model("User");

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
