const express=require("express");
const Router=express.Router();
const {body,query,param}=require("express-validator");
const controlls=require("../Controllers/StudentController");
const decodeAuthentication=require("../AuthenticationMiddleware/AuthenticationMiddleWare");

//to check the if the user has login or not 
Router.use(decodeAuthentication);
Router.get("/student/events/:id",controlls.getAllRegisterdEve)
.get("/student/:id",controlls.getStudent)
 .put("/student/:id",[
    body("email").exists().withMessage("this Field is Mandatory").isEmail().withMessage("your Email Doesn't matches the Criteria"),
    body("password").exists().withMessage("this Field is Mandatory").isStrongPassword().withMessage("password doesn't matches password Crietria")
 ],controlls.updateStudent)
// .put()
// .delete()


module.exports=Router;