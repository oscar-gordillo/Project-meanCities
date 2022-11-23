const express = require('express')
const app = express()
require("dotenv").config();
require("./api/data/db.js");
const path=require("path")
const routes= require("./api/routes");
//app.use(express.json());
//app.use(express.urlencoded({extended: true}));



app.use(express.json({limit: '16mb'}));
app.use(express.urlencoded({limit: '16mb'}));

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
})

app.use("/api",function(req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:4200');    
    res.header('Access-Control-Allow-Headers','Origin, XRequested-With, Content-Type, Accept, authorization');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    next();
    
})

app.use("/api", routes);

app.use(express.static(path.join(__dirname,"public")));

const server=app.listen(process.env.PORT, () => {
    console.log(process.env.EXPRESS_STARTUP_MESSAGE+server.address().port)
  })