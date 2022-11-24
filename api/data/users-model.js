const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
    });

mongoose.model(process.env.USER_MODEL, userSchema, process.env.USERS_COLLECTION_NAME);  
