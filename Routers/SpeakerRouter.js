const express=require("express");
const {query, body}=require("express-validator");
const speaker=require("../Models/SpeakersSchema");
const Router=express.Router();
const Controllers=require("../Controllers/speakerControllers");
const decodeAuthentication=require("../AuthenticationMiddleware/AuthenticationMiddleWare");
//to check the if the user has login or not 
 Router.use(decodeAuthentication);

Router

.get("/speaker/events/:id",Controllers.getRegisteredEvents)//getRegistered Events
.get("/speaker/:id",Controllers.getSpeaker)//Get Speaker Data....
 .put("/speaker/:id",[
     
body("email").isEmail().withMessage("your Email Doesn't matches the Criteria"),
body("password").isStrongPassword().withMessage("password doesn't matches password Crietria"),
body("address.city").isString(),
body("address.street").isString(),
body("address.building").isNumeric(),
 ],Controllers.updateSpeaker)//Edit Speaker Profile...

//this Bonus Part...
.delete("/speaker/:sid/:eid",Controllers.deleteEvents);


module.exports=Router;