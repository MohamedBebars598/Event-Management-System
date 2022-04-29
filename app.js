const express=require("express");
const server=express();
const mongoose=require("mongoose");
require('dotenv').config()//to make a config file..
const autoIncrement = require('mongoose-auto-increment');//auto increament
const body_parser=require("body-parser");
const cors = require('cors')
//Routes Objects
const AdminRouter=require("./Routers/AdminRouter");
const SpeakerRouter=require("./Routers/SpeakerRouter");
const StudentRouter=require("./Routers/StudentRouter");
const AuthenticationRouter=require("./Routers/AuthenticationRouter");
const signup=require("./Routers/SignUp");
const port=process.env.Port||8080;

//conncet to DB and and start listning ....
mongoose.connect(process.env.connection_string)
        .then(()=>{
            console.log("DB connectd");
            server.listen(process.env.PORT||8080,()=>{
                console.log("I am Listening ....... ")
            });
        })
        .catch(error=>console.log("DB Connection problem"))

      


//logger middle ware ...
server.use((request,response,next)=>{

    console.log(request.url);
    console.log(request.method);
    next();
})


//parsing json object incase request that has body...
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));



//CORS
server.use(cors());

//sign up Routes..
server.use(signup);
//Routers
//get Authentication for users that already have data in DB
server.use(AuthenticationRouter);
//admin Router
server.use(AdminRouter);
//speaker Router
server.use(SpeakerRouter);
//Admin
server.use(StudentRouter);



//not found middle Ware
server.use((request,response)=>{

    response.status(404).json({meassge:"page Not found"});

})






//error middle ware....
server.use((error,request,response,next)=>{

    response.status(500).json({meassge:error+""});
})