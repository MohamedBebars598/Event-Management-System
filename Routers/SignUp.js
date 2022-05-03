const express=require("express");
const {query, body}=require("express-validator");
const speaker=require("../Models/SpeakersSchema");
const Router=express.Router();
const speakerControllers=require("../Controllers/speakerControllers");
const studentControllers=require("../Controllers/StudentController");


console.log("ana signuo")
//this Router For sign up for all users of the Event system...
Router
.post("/speaker/signup",[
    body("email"),
    body("password").isStrongPassword().withMessage("password doesn't matches password Crietria"),
    body("city").isString(),
    body("street").isString(),
    body("building").isNumeric(),
    ],speakerControllers.speakerSignUp)


    .post("/student/signup",[
        body("email"),
        body("password").isStrongPassword().withMessage("password doesn't matches password Crietria"),
        ],studentControllers.studentSignUp)
    
module.exports=Router;
    