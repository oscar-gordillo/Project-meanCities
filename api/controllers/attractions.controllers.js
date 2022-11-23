const mongoose = require("mongoose");
const City = mongoose.model(process.env.CITY_MODEL);

module.exports.getAll = function (req, res) {
    console.log("GET attractions Controller");
    const cityId = req.params.cityId;
    City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found attractions ", city.attractions, " for City ", city);
        res.status(process.env.OK_STATUS_CODE).json(city.attractions);
    });
}
const _addAttraction = function (req, res, city) {

    const newAtracction = {
        name: req.body.name, 
        interestingFacts: req.body.interestingFacts,
        image:req.body.image,
        video:req.body.video
    };
    console.log('adding new attraction');
    
    city.attractions.push(newAtracction);

    console.log('pushing new attraction');

    city.save(function (err, updatedCity) {
        const response = { status: process.env.OK_STATUS_CODE, message: [] };
        if (err) {
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else {
            response.status = process.env.OK_STATUS_CODE_INSERT;
            response.message = updatedCity.attractions;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.addOne = function (req, res) {
    console.log("Add One attractions Controller");
    const cityId = req.params.cityId;
    if (!mongoose.isValidObjectId(cityId)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": "Not valid ID" });
        return;
    }
    const response = { status: parseInt(process.env.OK_STATUS_CODE), message: {} };
    City.findById(cityId).select("attractions").exec()
    .then(city=>{
        if (!city) {
            console.log("Error finding city");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": "city ID not found " + cityId };
            res.status(response.status).json(response.message);
        }else{
            _addAttraction(req, res, city);
        }
    })
    .catch(err=>{
        console.log("Error finding city");
        response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
        response.message = err;
        res.status(response.status).json(response.message);
    });
    
        
    /* City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found city ", city);
        const response = { status: process.env.OK_STATUS_CODE, message: city };
        if (err) {
            console.log("Error finding city");
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else if (!city) {
            console.log("Error finding city");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": "city ID not found " + cityId };
        }
        if (city) {
            _addAttraction(req, res, city);
        } else {
            res.status(response.status).json(response.message);
        }
    }); */
}


const _deleteAttraction = function (req, res, city) {

    city.attractions = city.attractions.filter( attraction => attraction._id != req.params.attractionId );
    
    city.save(function (err, updatedCity) {
        const response = { status: process.env.OK_STATUS_CODE, message: [] };
        if (err) {
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else {
            response.status = process.env.OK_STATUS_CODE;
            response.message = updatedCity.attractions;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.deleteOne = function (req, res) {
    console.log("Delete One attractions Controller");
    const cityId = req.params.cityId;
    if (!mongoose.isValidObjectId(cityId)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": "Not valid ID" });
        return;
    }
    const response = { status: process.env.OK_STATUS_CODE };
    City.findById(cityId).select("attractions").exec()
    .then(city=>{
        if (!city) {
            console.log("Error finding city");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": "city ID not found " + cityId };
            res.status(response.status).json(response.message);
        }else{
            _deleteAttraction(req, res, city);
        }
    })
    .catch(err=>{
        console.log("Error finding city");
        response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
        response.message = err;
        res.status(response.status).json(response.message);
    })
    ;
        
        
       
    /* City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found city ", city);
        const response = { status: process.env.OK_STATUS_CODE, message: city.attractions };
        if (err) {
            console.log("Error finding city");
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else if (!city) {
            console.log("Error finding city");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": "city ID not found " + cityId };
        }
        if (city) {
            _deleteAttraction(req, res, city);
        } else {
            res.status(response.status).json(response.message);
        }
    }); */
}

const _getAttraction = function (req, res, city) {
    console.log(req.params.attractionId);
    //console.log(city.attractions);
    let attraction = city.attractions.find( attraction => attraction._id == req.params.attractionId );
    //console.log(attraction);
    const response = { status: process.env.OK_STATUS_CODE, message: [] };
    if (!attraction) {
        response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
        response.message = 'Attraction ID Not Found';
    } else {
        response.status = process.env.OK_STATUS_CODE;
        //attraction.image=new Buffer(attraction.image).toString('base64');
        //console.log(new Buffer(attraction.image).toString('base64'));
        response.message = attraction;
    }
    res.status(response.status).json(response.message);        
}

module.exports.getOne = function (req, res) {
    console.log("Get One attractions Controller");
    const cityId = req.params.cityId;
    if (!mongoose.isValidObjectId(cityId)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json({ "message": "Not valid ID" });
        return;
    }
    const response = { status: process.env.OK_STATUS_CODE, message: {} };
    City.findById(cityId).select("attractions").exec()
    .then(city=>{
        if (!city) {
            console.log("Error finding city");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": "city ID not found " + cityId };
            res.status(response.status).json(response.message);
        }else{
            _getAttraction(req, res, city);
        }
    })
    .catch(err=>{
        console.log("Error finding city");
        response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
        response.message = err;
        res.status(response.status).json(response.message);
    });
    /* City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found city ", city);
        const response = { status: process.env.OK_STATUS_CODE, message: city.attractions };
        if (err) {
            console.log("Error finding city");
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else if (!city) {
            console.log("Error finding city");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": "city ID not found " + cityId };
        }
        if (city) {
            _getAttraction(req, res, city);
        } else {
            res.status(response.status).json(response.message);
        }
    }); */
}




const _updateAttractionFull = function (req, res, city) {
    let index = city.attractions.findIndex( attraction => attraction._id == req.params.attractionId );
    if (index!=-1) {        
        city.attractions[index].name=req.body.name;
        city.attractions[index].interestingFacts=req.body.interestingFacts;
        city.attractions[index].image=req.body.image;
        city.attractions[index].video=req.body.video;
    }else{
        res.status(process.env.NOT_FOUND_STATUS_CODE).json("Attraction Id NOT FOUND");
        return;
    }
    
    city.save(function (err, updatedCity) {
        const response = { status: process.env.OK_STATUS_CODE, message: [] };
        if (err) {
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else {
            response.status = process.env.OK_STATUS_CODE;
            response.message = updatedCity.attractions[index];
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.updateOneFull = function (req, res) {
    _updateOneWithCallback(req,res,_updateAttractionFull);
}




const _updateAttractionPartial = function (req, res, city) {
    console.log(city.attractions);
    console.log('req.params.attractionId',req.params.attractionId);
    index = city.attractions.findIndex( attraction => attraction._id == req.params.attractionId );
    console.log('index',index);
    if (index!=-1) {
        if (req.body.name) 
            city.attractions[index].name=req.body.name;
        if (req.body.interestingFacts)
            city.attractions[index].interestingFacts=req.body.interestingFacts;
        if (req.body.image)
            city.attractions[index].image=req.body.image;
        if (req.body.video)
            city.attractions[index].video=req.body.video;
    }else{
        res.status(process.env.NOT_FOUND_STATUS_CODE).json("Attraction Id NOT FOUND");
        return;
    }
    
    city.save(function (err, updatedCity) {
        const response = { status: process.env.OK_STATUS_CODE, message: [] };
        if (err) {
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else {
            response.status = process.env.OK_STATUS_CODE;
            response.message = updatedCity.attractions[index];
        }
        res.status(response.status).json(response.message);
    });
}

function _updateOneWithCallback(req,res,functionToBeCalled){
    console.log("Update One attractions Controller");
    const cityId = req.params.cityId;
    City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found city ", city);
        const response = { status: process.env.OK_STATUS_CODE, message: city.attractions };
        if (err) {
            console.log("Error finding city");
            response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
            response.message = err;
        } else if (!city) {
            console.log("Error finding city");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": "city ID not found " + cityId };
        }
        if (city) {
            functionToBeCalled(req, res, city);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

module.exports.updateOnePartial = function (req, res) {
    _updateOneWithCallback(req,res,_updateAttractionPartial);
}