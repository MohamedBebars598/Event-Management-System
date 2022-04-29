const express=require("express");
const {query}=require("express-validator");
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
query("email").isEmail().withMessage("your Email Doesn't matches the Criteria"),
query("password").isStrongPassword().withMessage("password doesn't matches password Crietria"),
query("city").isString(),
query("street").isString(),
query("building").isNumeric(),
 ],Controllers.updateSpeaker)//Edit Speaker Profile...

//this Bonus Part...
.delete("/speaker/:sid/:eid",Controllers.deleteEvents);


module.exports=Router;