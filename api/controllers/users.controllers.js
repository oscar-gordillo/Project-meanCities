const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const User = mongoose.model(process.env.USER_MODEL);
const jwt = require('jsonwebtoken');

function _sendResponse(res,response){
    res.status(response.status).json(response.message);
}

function _createDefaultResponse(status,message){
    let response = {status:parseInt(process.env.OK_STATUS_CODE), message:{}};
    if (status) {
        response.status=status;
    }
    if (message){
        response.message=message;
    }
    return response;
}

function _setStatusMessageResponse(response,status,message){
    response.status=parseInt(status);
    response.message=message;
}

function _checkUserExists(user,response){
    return new Promise((resolve,reject)=>{        
        if (!user) {
            console.log(process.env.MESSAGE_ERROR_USER_ID_NOT_FOUND);
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.MESSAGE_ERROR_USER_ID_NOT_FOUND;
            reject();
        }else{
            response.message=user;            
            resolve(user);
        }  
    });   
}

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
  }

function _checkPassword(response,password,user){
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password)
        .then(passwordMatch=>{
            if (passwordMatch) {
                resolve(user);
            }else{
                _setStatusMessageResponse(response,process.env.WRONG_INPUT_ERROR_STATUS,process.env.MESSAGE_ERROR_PASSWORD_NOT_MATCH);
                reject();
            }
        })
        .catch(err=>{
            _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);  
            reject();
        });
    });
    
      
}  

module.exports.login = function (req, res) {
    
    const username=req.body.username;
    const password=req.body.password;
    const response=_createDefaultResponse();
    User.findOne({username:username}).exec()
    .then(user=>_checkUserExists(user,response))
    .then(user=>_checkPassword(response,password,user))
    .then(user=> {
        const token = generateAccessToken({ name: user.name });
        _setStatusMessageResponse(response,process.env.OK_STATUS_CODE,token);
    })
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.WRONG_INPUT_ERROR_STATUS,err);
    })
    .finally(()=>{
        _sendResponse(res,response);    
    });
            
}

function _hashPassword(req,salt){
    return new Promise((resolve,reject)=>{
        bcrypt.hash(req.body.password,salt)
        .then(hash=>{            
            resolve(hash);
        })
        .catch(err=>{reject(err);});
    });
}

function _createNewUser(req,hash,response){
    const newUser = {
        name: req.body.name, username: req.body.username, password: hash
    };
    User.create(newUser)
    .then(user=>_setStatusMessageResponse(response,process.env.OK_STATUS_CODE_INSERT,user))
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.WRONG_INPUT_ERROR_STATUS,err)
    });  
}

module.exports.addOne = function (req, res) {
    
    const response=_createDefaultResponse();

    bcrypt.genSalt(10)
    .then(salt=>_hashPassword(req,salt))
    .then(hash=>_createNewUser(req,hash,response))
    .catch(err=>_setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err))
    .finally(()=>_sendResponse(res,response));
    
}
