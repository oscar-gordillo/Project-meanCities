const { response } = require("express");
const mongoose = require("mongoose");
const City = mongoose.model(process.env.CITY_MODEL);
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
    /* City.find().skip(offset).limit(count).exec(function (err, cities) {
        if (err) {
            console.log(process.env.MESSAGE_ERROR_FINDING_CITIES);
            res.status(process.env.INTERNAL_SERVER_ERROR_STATUS).json(err);
        } else {
            console.log(process.env.MESSAGE_SUCCESS_FINDING_CITIES, cities.length);
            res.status(process.env.OK_STATUS_CODE).json(cities);
        }
    }); */

    const response = {status:parseInt(process.env.OK_STATUS_CODE), message:{}};
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
        res.status(response.status).json(response.message);
    });


};

module.exports.getOne = function (req, res) {
    const cityId = req.params.cityId;
    if (!mongoose.isValidObjectId(cityId)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": "Not valid ID" });
        return;
    }
    /* City.findById(cityId).exec(function (err, city) {
        const response = {
            status: process.env.OK_STATUS_CODE,
            message: city
        };
        if (err) {
            console.log(process.env.MESSAGE_ERROR_FINDING_CITY);
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else if (!city) {
            console.log(process.env.MESSAGE_ERROR_CITY_ID_NOT_FOUND);
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.MESSAGE_ERROR_CITY_ID_NOT_FOUND };
        }
        res.status(response.status).json(response.message);                
    }); */

    const response = {
        status: parseInt(process.env.OK_STATUS_CODE),
        message: {}
    };
    City.findById(cityId).exec()
    .then(city=>{
        if (!city) {
            console.log(process.env.MESSAGE_ERROR_CITY_ID_NOT_FOUND);
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.MESSAGE_ERROR_CITY_ID_NOT_FOUND;
        }else{
            response.message=city;
        }        
    })
    .catch(err=>{
        console.log(process.env.MESSAGE_ERROR_FINDING_CITY);
        response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
        response.message = err;
    })
    .finally(()=>{
        res.status(response.status).json(response.message)
    });
}

module.exports.addOne = function (req, res) {
    console.log("City AddOne request");
    const newCity = {
        cityName: req.body.cityName, countryName: req.body.countryName, yearVisited: req.body.yearVisited,
        attractions: req.body.attractions
    };
    City.create(newCity, function (err, city) {
        const response = { status: process.env.OK_STATUS_CODE_INSERT, message: city };
        if (err) {
            console.log("Error creating city",err);
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.deleteOne = function (req, res) {
    const cityId = req.params.cityId;
    if (!mongoose.isValidObjectId(cityId)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": "Not valid ID" });
        return;
    }
    const response = {
        status: process.env.OK_STATUS_CODE,
        message: {}
    };

    City.findByIdAndDelete(cityId).exec()
    .then(deletedCity=>{
        if (!deletedCity) {
            console.log("City id not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = "City ID not found";
        }else{
            response.message=deletedCity;
        }
    })    
    .catch(err=>{
            console.log("Error deleting city");
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
    })
    .finally(res.status(response.status).json(response.message));
    /* City.findByIdAndDelete(cityId).exec(function(err,deletedCity){
        const response = {
            status: process.env.OK_STATUS_CODE,
            message: deletedCity
        };
        if (err) {
            console.log("Error deleting city");
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else if (!deletedCity) {
            console.log("City id not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": "City ID not found" };
        }
        res.status(response.status).json(response.message);
    });   */  
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
    City.findById(cityId).exec(function (err, city) {
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
    });
}
module.exports.updateOneFull=function(req,res){
    _updateOne(req,res,_returnCityFull);
}

module.exports.updateOnePartial=function(req,res){
    _updateOne(req,res,_returnCityPartial);
}