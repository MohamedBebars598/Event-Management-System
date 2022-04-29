const express=require("express");
const Router=express.Router();
const Controls=require("../Controllers/AdminControllers");
const {body,param,query}=require("express-validator");
const decodeAuthentication=require("../AuthenticationMiddleware/AuthenticationMiddleWare");

Router.use(decodeAuthentication);


//get //post //update //Delete
Router
//Admin-Event
.post("/admin/student",Controls.createStudent)
.post("/admin/event",[
    query("title").isString(),
    query("date").customSanitizer((value)=>{

        let regx=/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gm .test(value);
        if(regx==false){
            throw new Error("invalid Date Format....(YYYY-MM-DD)");
        }
    }),
    query("mainSpeaker").isNumeric().withMessage("invalid numric value"),
    query("otherSpeakers").isNumeric().withMessage("invalid numric value"),
    query("students").isNumeric().withMessage("invalid numric value"),
    
],Controls.createEvent)
.get("/admin/event/:id",Controls.getEvent)
.put("/admin/event/:id",[
        query("title").isString(),
        query("date").customSanitizer((value)=>{
    
            let regx=/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gm .test(value);
            if(regx==false){
                throw new Error("invalid Date Format....(YYYY-MM-DD)");
            }
        }),
        query("mainSpeaker").isNumeric().withMessage("invalid numric value"),
        query("otherSpeakers").isNumeric().withMessage("invalid numric value"),
        query("students").isNumeric().withMessage("invalid numric value"),
],Controls.updateEvent)



//Admin-Student
.get("/admin/student/:id",Controls.getSpeaker)
.put("/admin/student/:id",Controls.updateStudent)
.delete("/admin/student/:id",Controls.deleteStudent)
.delete("/admin/event/:id",Controls.DeleteEvent)
//Admin-Speaker...
.get("/admin/speaker/:id",Controls.getSpeaker)
.post("/admin/speaker",Controls.createSpeaker)
.put("/admin/speaker/:id",Controls.updateSpeaker)
.delete("/admin/speaker/:id",Controls.deleteSpeaker)



//Admin-Add-student-event
.put("/admin/student/add/:id",[

query("students").isNumeric()

],Controls.addStudentToEve)



//Admin-Add-otherSpeakers-event
.put("/admin/otherspeakers/add/:id",[

    query("otherSpeakers").isNumeric()
    
    ],Controls.addOtherSpeakersToEve)


//Admin-Add-mainSpeaker-event
.put("/admin/mainSpeaker/add/:id",[

        query("mainSpeaker").isNumeric()
        
        ],Controls.addMainSpeakerToEve);

module.exports=Router;







