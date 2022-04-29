const express=require("express");
const {query}=require("express-validator");
const speaker=require("../Models/SpeakersSchema");
const Router=express.Router();
const speakerControllers=require("../Controllers/speakerControllers");
const studentControllers=require("../Controllers/StudentController");


console.log("ana signuo")
//this Router For sign up for all users of the Event system...
Router
.post("/speaker/signup",[
    query("email"),
    query("password").isStrongPassword().withMessage("password doesn't matches password Crietria"),
    query("city").isString(),
    query("street").isString(),
    query("building").isNumeric(),
    ],speakerControllers.speakerSignUp)


    .post("/student/signup",[
        query("email"),
        query("password").isStrongPassword().withMessage("password doesn't matches password Crietria"),
        ],studentControllers.studentSignUp)
    
module.exports=Router;
    