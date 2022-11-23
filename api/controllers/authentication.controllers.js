const jwt = require('jsonwebtoken');

module.exports.auhtenticate = function (req, res, next) {
    console.log("authenticate");
    const headerExists=req.headers.authorization;
    if (headerExists){
        const token=req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET,function(err,valid){
            if (err){
                res.status(500).json('error validating');
            }else{
                if (valid) {
                    next();
                }else{
                    res.status(500).json('not valid');
                }
            }
        });

        
    }else{
        res.status(500).json('not token');
    }
}


