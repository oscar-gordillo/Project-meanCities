const mongoose= require("mongoose");

const attractionSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    interestingFacts: String,
    image:String,
    video:String
    });

const citySchema= new mongoose.Schema({
        cityName: {
            type: String,
            required: true
        },
        countryName: {
            type: String,
            required: true
        },
        yearVisited:Number,
        attractions:[attractionSchema]
    });    
mongoose.model(process.env.CITY_MODEL, citySchema, process.env.CITIES_COLLECTION_NAME);    
