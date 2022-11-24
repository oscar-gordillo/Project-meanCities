const mongoose = require("mongoose");
const City = mongoose.model(process.env.CITY_MODEL);

function _setStatusMessageResponse(response,status,message){
    response.status=parseInt(status);
    response.message=message;
}

function _checkCityExists(city,response){
    return new Promise((resolve,reject)=>{        
        if (!city) {
            console.log(process.env.MESSAGE_ERROR_CITY_ID_NOT_FOUND);
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.MESSAGE_ERROR_CITY_ID_NOT_FOUND;
            reject();
        }else{
            response.message=city;            
            resolve(city);
        }  
    });   
}
function _buildCityfromFunction(functionToBeCalled,req,city){
    return new Promise((resolve,reject)=>{
        city=functionToBeCalled(req,city);
        resolve(city);
    });
}
function _saveCity(city,response){
    city.save()
    .then(city=>{
        _checkCityExists(city,response)
          }
        )
    .catch(err=>{_setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);})                
}

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

module.exports.getAll = function (req, res) {

    let offset = parseFloat(process.env.DEFAULT_FIND_OFFSET, 10);
    let count = parseFloat(process.env.DEFAULT_FIND_COUNT, 10);
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": process.env.OFFSET_COUNT_NUMBER_ERROR_MESSAGE });
        return;
    }
    if (count > maxCount) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": process.env.MESSAGE_ERROR_COUNT_MAX + maxCount });
        return;
    }    
    

    const response = _createDefaultResponse();
    City.find().skip(offset).limit(count).exec()
    .then(cities=>{
        console.log(process.env.MESSAGE_SUCCESS_FINDING_CITIES, cities.length);
        response.message=cities;
    })
    .catch(err=>{
        console.log(process.env.MESSAGE_ERROR_FINDING_CITIES);
        response.status=parseInt(process.env.INTERNAL_SERVER_ERROR_STATUS);
        response.message(err);
    })
    .finally(()=>{
        _sendResponse(res,response);    
    });


};

module.exports.getOne = function (req, res) {
    const cityId = req.params.cityId;
    if (!mongoose.isValidObjectId(cityId)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": process.env.MESSAGE_NOT_VALID_ID });
        return;
    }
    

    const response = _createDefaultResponse();
    City.findById(cityId).exec()
    .then(city=>{
        _checkCityExists(city,response);
    })
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
    })
    .finally(()=>{
        _sendResponse(res,response);        
    });
}

module.exports.addOne = function (req, res) {
    console.log("City AddOne request");
    const newCity = {
        cityName: req.body.cityName, countryName: req.body.countryName, yearVisited: req.body.yearVisited,
        attractions: req.body.attractions
    };
    const response = _createDefaultResponse();
    City.create(newCity)
    .then(city=>{_setStatusMessageResponse(response,process.env.OK_STATUS_CODE,city)})
    .catch(err=>{_setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err)})
    .finally(_sendResponse(res,response));
                   
}

module.exports.deleteOne = function (req, res) {
    const cityId = req.params.cityId;
    if (!mongoose.isValidObjectId(cityId)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": "Not valid ID" });
        return;
    }
    const response = _createDefaultResponse();

    City.findByIdAndDelete(cityId).exec()
    .then(deletedCity=>{
        _checkCityExists(deletedCity,response);
    })    
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
    })
    .finally(_sendResponse(res,response));
    
}

function _returnCityFull(req,city){
    city.cityName= req.body.cityName;
    city.countryName= req.body.countryName;
    city.yearVisited= req.body.yearVisited;
    city.attractions= req.body.attractions;
    return city;
}

function _returnCityPartial(req,city){
        if (req.body.cityName) 
            city.cityName= req.body.cityName;
        if (req.body.countryName) 
            city.countryName= req.body.countryName;
        if (req.body.yearVisited) 
            city.yearVisited= req.body.yearVisited;
        if (req.body.attractions) 
            city.attractions= req.body.attractions;
    return city;
}

function _updateOne(req,res,functionToBeCalled){
    const cityId = req.params.cityId;
    if (!mongoose.isValidObjectId(cityId)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": "Not valid ID" });
        return;
    }
    const response=_createDefaultResponse();
    City.findById(cityId).exec()
    .then(city=>_checkCityExists(city,response))
    .then(city=>_buildCityfromFunction(functionToBeCalled,req,city))
    .then(city=>{_saveCity(city,response)})
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
    })
    .finally(_sendResponse(res,response));
    
    /* City.findById(cityId).exec(function (err, city) {
        if (err) {
            res.status(process.env.INTERNAL_SERVER_ERROR_STATUS).json(err);
            return;
        } else if (!city) {
            res.status(process.env.INTERNAL_SERVER_ERROR_STATUS).json("City id not found");
            return;
        }
        city=functionToBeCalled(req,city);
        city.save(function(err,city){
            console.log(city);
            if(err){
                res.status(process.env.INTERNAL_SERVER_ERROR_STATUS).json(err);           
            }else if(!city){
                res.status(process.env.INTERNAL_SERVER_ERROR_STATUS).json(err);           
            }
            res.status(process.env.OK_STATUS_CODE).json(city);           
        });
    }); */
}
module.exports.updateOneFull=function(req,res){
    _updateOne(req,res,_returnCityFull);
}

module.exports.updateOnePartial=function(req,res){
    _updateOne(req,res,_returnCityPartial);
}