const jwt = require('jsonwebtoken');
const util=require("util")

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



module.exports.auhtenticate = function (req, res, next) {
    const headerExists=req.headers.authorization;
    const response=_createDefaultResponse();
    if (headerExists){
        const token=req.headers.authorization.split(" ")[1];  
        let jwtVerifyPromise=util.promisify(jwt.verify,{context:jwt});
        jwtVerifyPromise(token, process.env.TOKEN_SECRET)
        .then(valid=>{
            if (valid) {
                next();
            }else{
                _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,process.env.MESSAGE_ERROR_NOT_VALID_TOKEN);
                _sendResponse(res,response)
            }
        })
        .catch(err=>{
            _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
            _sendResponse(res,response)
        })
        
        ;

        
        

        
    }else{
        res.status(process.env.INTERNAL_SERVER_ERROR_STATUS).json(process.env.MESSAGE_ERROR_NOT_TOKEN_PROVIDED);
        _sendResponse(res,response)
    }
}


