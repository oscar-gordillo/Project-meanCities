const mongoose = require("mongoose");
const City = mongoose.model(process.env.CITY_MODEL);

function _setStatusMessageResponse(response,status,message){
    response.status=parseInt(status);
    response.message=message;
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
    console.log("GET attractions Controller");
    const cityId = req.params.cityId;
    const response=_createDefaultResponse();
    City.findById(cityId).select("attractions").exec()
    .then(city=>{_setStatusMessageResponse(response,process.env.OK_STATUS_CODE,city.attractions)})
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
    })
    .finally(()=>{
        _sendResponse(res,response);        
    });
    
}
const _addAttraction = function (req, res, city) {

    const newAtracction = {
        name: req.body.name, 
        interestingFacts: req.body.interestingFacts,
        image:req.body.image,
        video:req.body.video
    };
    
    city.attractions.push(newAtracction);

    const response=_createDefaultResponse();
    
    city.save()
    .then(updatedCity=>{_setStatusMessageResponse(response,process.env.OK_STATUS_CODE_INSERT,updatedCity.attractions)})
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
    })
    .finally(()=>{
        _sendResponse(res,response);        
    });
    
    
}
module.exports.addOne = function (req, res) {
    
    const cityId = req.params.cityId;
    if (!mongoose.isValidObjectId(cityId)) {
        res.status(process.env.WRONG_INPUT_ERROR_STATUS).json(process.env.MESSAGE_NOT_VALID_ID);
        return;
    }
    const response = _createDefaultResponse();
    City.findById(cityId).select("attractions").exec()
    .then(city=>{
        if (!city) {            
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.MESSAGE_ERROR_CITY_ID_NOT_FOUND + cityId };
            res.status(response.status).json(response.message);
        }else{
            _addAttraction(req, res, city);
        }
    })
    .catch(err=>{
        response.status = process.env.INTERNAL_SERVER_ERROR_STATUS;
        response.message = err;
        res.status(response.status).json(response.message);
    });
    
        
    
}


const _deleteAttraction = function (req, res, city) {

    city.attractions = city.attractions.filter( attraction => attraction._id != req.params.attractionId );
    
    const response=_createDefaultResponse();
    city.save()
    .then(updatedCity=>{_setStatusMessageResponse(response,process.env.OK_STATUS_CODE,updatedCity.attractions)})
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
    })
    .finally(()=>{
        _sendResponse(res,response);        
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
    const response = _createDefaultResponse();
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
    const response =_createDefaultResponse();
    city.save()
    .then(updatedCity=>{_setStatusMessageResponse(response,process.env.OK_STATUS_CODE,updatedCity.attractions[index])})
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
    })
    .finally(()=>{
        _sendResponse(res,response);        
    });
    
    
}
module.exports.updateOneFull = function (req, res) {
    _updateOneWithCallback(req,res,_updateAttractionFull);
}




const _updateAttractionPartial = function (req, res, city) {
    index = city.attractions.findIndex( attraction => attraction._id == req.params.attractionId );    
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
        res.status(process.env.NOT_FOUND_STATUS_CODE).json(process.env.MESSAGE_ERROR_ATTRACTION_ID_NOT_FOUND);
        return;
    }
    const response = _createDefaultResponse();
    city.save()
    .then(updatedCity=>{_setStatusMessageResponse(response,process.env.OK_STATUS_CODE,updatedCity.attractions[index])})
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
    })
    .finally(()=>{
        _sendResponse(res,response);        
    });
    
    
    
}

function _updateOneWithCallback(req,res,functionToBeCalled){
    console.log("Update One attractions Controller");
    const cityId = req.params.cityId;
    City.findById(cityId).select("attractions").exec()
    .then(city=>{
        if (!city) {            
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": "city ID not found " + cityId };
            _sendResponse(res,response);     
        }else{
            functionToBeCalled(req, res, city);
        }
    })
    .catch(err=>{
        _setStatusMessageResponse(response,process.env.INTERNAL_SERVER_ERROR_STATUS,err);
        _sendResponse(res,response);
    });
    
    
}

module.exports.updateOnePartial = function (req, res) {
    _updateOneWithCallback(req,res,_updateAttractionPartial);
}