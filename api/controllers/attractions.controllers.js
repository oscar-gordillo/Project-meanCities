const mongoose = require("mongoose");
const City = mongoose.model(process.env.CITY_MODEL);
module.exports.getAll = function (req, res) {
    console.log("GET attractions Controller");
    const cityId = req.params.cityId;
    City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found attractions ", city.attractions, " for City ", city);
        res.status(200).json(city.attractions);
    });
}
const _addAttraction = function (req, res, city) {
    
    const newAtracction = {
        name: req.body.name, interestingFacts: req.body.interestingFacts
    };

    city.attractions.push(newAtracction);

    city.save(function (err, updatedCity) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedCity.attractions;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.addOne = function (req, res) {
    console.log("Add One attractions Controller");
    const cityId = req.params.cityId;
    City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found city ", city);
        const response = { status: 200, message: city };
        if (err) {
            console.log("Error finding city");
            response.status = 500;
            response.message = err;
        } else if (!city) {
            console.log("Error finding city");
            response.status = 404;
            response.message = { "message": "city ID not found " + cityId };
        }
        if (city) {
            _addAttraction(req, res, city);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}


const _deleteAttraction = function (req, res, city) {

    city.attractions = city.attractions.filter( attraction => attraction._id != req.params.attractionId );
    
    city.save(function (err, updatedCity) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedCity.attractions;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.deleteOne = function (req, res) {
    console.log("Delete One attractions Controller");
    const cityId = req.params.cityId;
    City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found city ", city);
        const response = { status: 200, message: city.attractions };
        if (err) {
            console.log("Error finding city");
            response.status = 500;
            response.message = err;
        } else if (!city) {
            console.log("Error finding city");
            response.status = 404;
            response.message = { "message": "city ID not found " + cityId };
        }
        if (city) {
            _deleteAttraction(req, res, city);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const _getAttraction = function (req, res, city) {
    console.log(req.params.attractionId);
    console.log(city.attractions);
    let attraction = city.attractions.find( attraction => attraction._id == req.params.attractionId );
    console.log(attraction);
    const response = { status: 200, message: [] };
    if (!attraction) {
        response.status = 500;
        response.message = 'Attraction ID Not Found';
    } else {
        response.status = 201;
        response.message = attraction;
    }
    res.status(response.status).json(response.message);        
}

module.exports.getOne = function (req, res) {
    console.log("Get One attractions Controller");
    const cityId = req.params.cityId;
    City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found city ", city);
        const response = { status: 200, message: city.attractions };
        if (err) {
            console.log("Error finding city");
            response.status = 500;
            response.message = err;
        } else if (!city) {
            console.log("Error finding city");
            response.status = 404;
            response.message = { "message": "city ID not found " + cityId };
        }
        if (city) {
            _getAttraction(req, res, city);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}




const _updateAttraction = function (req, res, city) {
    let index = city.attractions.findIndex( attraction => attraction._id == req.params.attractionId );
    if (index) {
        city.attractions[index].name=req.body.name;
        city.attractions[index].interestingFacts=req.body.interestingFacts;
    }else{
        res.status(404).json("Attraction Id NOT FOUND");
        return;
    }
    
    city.save(function (err, updatedCity) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedCity.attractions[index];
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.updateOne = function (req, res) {
    console.log("Update One attractions Controller");
    const cityId = req.params.cityId;
    City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found city ", city);
        const response = { status: 200, message: city.attractions };
        if (err) {
            console.log("Error finding city");
            response.status = 500;
            response.message = err;
        } else if (!city) {
            console.log("Error finding city");
            response.status = 404;
            response.message = { "message": "city ID not found " + cityId };
        }
        if (city) {
            _updateAttraction(req, res, city);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}




const _updateAttractionPartial = function (req, res, city) {
    let index = city.attractions.findIndex( attraction => attraction._id == req.params.attractionId );
    if (index) {
        if (req.body.name) 
            city.attractions[index].name=req.body.name;
        if (req.body.interestingFacts)
            city.attractions[index].interestingFacts=req.body.interestingFacts;
    }else{
        res.status(404).json("Attraction Id NOT FOUND");
        return;
    }
    
    city.save(function (err, updatedCity) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedCity.attractions[index];
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.updateOnePartial = function (req, res) {
    console.log("Update One attractions Controller");
    const cityId = req.params.cityId;
    City.findById(cityId).select("attractions").exec(function (err, city) {
        console.log("Found city ", city);
        const response = { status: 200, message: city.attractions };
        if (err) {
            console.log("Error finding city");
            response.status = 500;
            response.message = err;
        } else if (!city) {
            console.log("Error finding city");
            response.status = 404;
            response.message = { "message": "city ID not found " + cityId };
        }
        if (city) {
            _updateAttractionPartial(req, res, city);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}