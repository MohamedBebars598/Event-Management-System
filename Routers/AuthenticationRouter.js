const jwt=require("jsonwebtoken");
const express=require("express");
const {body,param,query}=require("express-validator");
const controlls=require("../Controllers/authenticaionControll");
const Router=express.Router();


console.log("sssss")
Router

.post("/login/:role",[

    body("email").exists().isEmail(),
    body("password").exists().isStrongPassword()
],controlls.getToken)




module.exports=Router;