const express=require("express");
const Router=express.Router();
const Controls=require("../Controllers/AdminControllers");
const {body,param,query}=require("express-validator");
const decodeAuthentication=require("../AuthenticationMiddleware/AuthenticationMiddleWare");

Router.use(decodeAuthentication);




//get //post //update //Delete
Router
.get("/admin/getAllEvents",Controls.getAllEvent)
//Admin-Event
.post("/admin/student",Controls.createStudent)
.post("/admin/event",[
    body("title").isString(),
    body("mainSpeaker").isNumeric().withMessage("invalid numric value"),
    body("otherSpeakers").isNumeric().withMessage("invalid numric value"),
    body("students").isNumeric().withMessage("invalid numric value"),
    
],Controls.createEvent)
.get("/admin/event/:id",Controls.getEvent)
.put("/admin/event/:id",[
        body("title").isString(),
        body("mainSpeaker").isNumeric().withMessage("invalid numric value"),
        body("otherSpeakers").isNumeric().withMessage("invalid numric value"),
        body("students").isNumeric().withMessage("invalid numric value"),
],Controls.updateEvent)



//Admin-Student
.get("/admin/getAllStudent",Controls.getAllStudents)
.get("/admin/student/:id",Controls.getSpeaker)
.put("/admin/student/:id",Controls.updateStudent)
.delete("/admin/student/:id",Controls.deleteStudent)
.delete("/admin/event/:id",Controls.DeleteEvent)
//Admin-Speaker...
.get("/admin/getAllSpeakers",Controls.getAllSpeakers)
.get("/admin/speaker/:id",Controls.getSpeaker)
.post("/admin/speaker",Controls.createSpeaker)
.put("/admin/speaker/:id",

[
    body("email").isEmail().withMessage("your Email Doesn't matches the Criteria"),
    body("address.city").isString(),
    body("address.street").isString(),
    body("address.building").isNumeric(),
     ]
,Controls.updateSpeaker)
.delete("/admin/speaker/:id",Controls.deleteSpeaker)



//Admin-Add-student-event
.put("/admin/student/add/:id",[

body("students").isNumeric()

],Controls.addStudentToEve)



//Admin-Add-otherSpeakers-event
.put("/admin/otherspeakers/add/:id",[

    body("otherSpeakers").isNumeric()
    
    ],Controls.addOtherSpeakersToEve)


//Admin-Add-mainSpeaker-event
.put("/admin/mainSpeaker/add/:id",[

        body("mainSpeaker").isNumeric()
        
        ],Controls.addMainSpeakerToEve);

module.exports=Router;







