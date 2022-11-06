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
    City.find().skip(offset).limit(count).exec(function (err, cities) {
        if (err) {
            console.log(process.env.MESSAGE_ERROR_FINDING_CITIES);
            res.status(process.env.INTERNAL_SERVER_ERROR_STATUS).json(err);
        } else {
            console.log(process.env.MESSAGE_SUCCESS_FINDING_CITIES, cities.length);
            res.status(process.env.OK_STATUS_CODE).json(cities);
        }
    });


};

module.exports.getOne = function (req, res) {
    const cityId = req.params.cityId;
    City.findById(cityId).exec(function (err, city) {
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
    });
}

module.exports.addOne = function (req, res) {
    console.log("City AddOne request");
    const newCity = {
        cityName: req.body.cityName, countryName: req.body.countryName, yearVisited: req.body.yearVisited,
        attractions: req.body.attractions
    };
    City.create(newCity, function (err, city) {
        const response = { status: 201, message: city };
        if (err) {
            console.log("Error creating city");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.deleteOne = function (req, res) {
    const cityId = req.params.cityId;
    City.findByIdAndDelete(cityId).exec(function(err,deletedCity){
        const response = {
            status: 200,
            message: deletedCity
        };
        if (err) {
            console.log("Error deleting city");
            response.status = 500;
            response.message = err;
        } else if (!deletedCity) {
            console.log("City id not found");
            response.status = 404;
            response.message = { "message": "City ID not found" };
        }
        res.status(response.status).json(response.message);
    });    
}
module.exports.updateOne=function(req,res){
    const cityId = req.params.cityId;
    City.findById(cityId).exec(function (err, city) {
        if (err) {
            res.status(500).json(err);
            return;
        } else if (!city) {
            res.status(500).json("City id not found");
            return;
        }
        city.cityName= req.body.cityName;
        city.countryName= req.body.countryName;
        city.yearVisited= req.body.yearVisited;
        city.attractions= req.body.attractions;
        city.save(function(err,city){
            console.log(city);
            if(err){
                res.status(500).json(err);           
            }else if(!city){
                res.status(500).json(err);           
            }
            res.status(200).json(city);           
        });
                      
    });
}

module.exports.updateOnePartial=function(req,res){
    const cityId = req.params.cityId;
    City.findById(cityId).exec(function (err, city) {
        if (err) {
            res.status(500).json(err);
            return;
        } else if (!city) {
            res.status(500).json("City id not found");
            return;
        }
        if (req.body.cityName) 
            city.cityName= req.body.cityName;
        if (req.body.countryName) 
            city.countryName= req.body.countryName;
        if (req.body.yearVisited) 
            city.yearVisited= req.body.yearVisited;
        if (req.body.attractions) 
            city.attractions= req.body.attractions;
        city.save(function(err,city){
            console.log(city);
            if(err){
                res.status(500).json(err);           
            }else if(!city){
                res.status(500).json(err);           
            }
            res.status(200).json(city);           
        });
                      
    });
}