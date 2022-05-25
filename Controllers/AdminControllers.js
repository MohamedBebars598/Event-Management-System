const Eevent=require("../Models/EventsSchema")//Event Collection
const Student=require("../Models/StudentSchema");//Student Collection
const Speaker=require("../Models/SpeakersSchema");//speaker Collerction
const {validationResult, body}=require("express-validator")
const checkAuthentication=require("../AuthenticationMiddleware/Autherization");
const moment=require('moment');



//get All Students in DB
exports.getAllStudents=(request,response)=>{

    
    checkAuthentication(request,"admin");

    Student.find({}).then(d=>{
        setTimeout(()=>{
            response.status(200).json(d);
        },1500)

        
        
    }).catch(err=>{

        next(err);
    })

}



//Get All Speakers in DB
exports.getAllSpeakers=(request,response)=>{
    checkAuthentication(request,"admin");

    Speaker.find({}).then(d=>{
        setTimeout(()=>{

            response.status(200).json(d);

        },1500)
        
    }).catch(err=>{

        next(err);
    })

}



//get All Event
exports.getAllEvent=(request,response)=>{
    checkAuthentication(request,"admin");

    Eevent.find({}).populate("mainSpeaker").populate("otherSpeakers").populate("students").then(d=>{
        
        setTimeout(()=>{

            response.status(200).json(d);

        },1500)
        
    }).catch(err=>{

        next(err);
    })

}



// get Event info...
exports.getEvent=(request,response,next)=>{
    checkAuthentication(request,"admin");

    let stdId=request.params.id;
    Eevent.findOne({_id:stdId}).populate("otherSpeakers").populate("students").then((s)=>{
        if(s==null){

            throw new Error("Event No."+stdId+" Not Found");
        }
        setTimeout(()=>{
            response.status(200).json(s);
        },1500)
    })
    .catch((err)=>{

       next(err);       
    })
  

}


// get Speaker info...
exports.getSpeaker=(request,response,next)=>{
    checkAuthentication(request,"admin");

    let stdId=request.params.id;
    Speaker.findOne({_id:stdId}).then((s)=>{
        if(s==null){

            throw new Error("student No."+stdId+" Not Found");
        }

        //this  just to make loading.....
        setTimeout(()=>{
            response.status(200).json(s);
        },1500)
    })
    .catch((err)=>{

       next(err);       
    })
  

}

//get Student Info.....
exports.getSpeaker=(request,response,next)=>{
    checkAuthentication(request,"admin");

    let stdId=request.params.id;
    Student.findOne({_id:stdId}).then((s)=>{
        if(s==null){

            throw new Error("student No."+stdId+" Not Found");
        }
        // this just to make loading
        setTimeout(()=>{

            response.status(200).json(s);

        },1500)
    })
    .catch((err)=>{

       next(err);       
    })
  

}


//create Event...
exports.createEvent=(request,response)=>{
    checkAuthentication(request,"admin");

    let result=validationResult(request);
    if(!result.isEmpty()){

        let Message="";
        for(let i=0;i<result.array().length;i++){
            Message+=result.array()[i].param+" ";
        }

        let err=new Error(Message);
        console.log(Message);
        throw err;

    }else{


        let event=new Eevent({
            title:request.body.title,
            date:request.body.date,
            mainSpeaker:request.body.mainSpeaker,
            otherSpeakers:request.body.otherSpeakers,
            students:request.body.students
        })

        console.log(request);
        console.log(event);
    
        event.save().then((s)=>{

            console.log(s);
            
        });
        
        
        response.status(200).json({meassge:"Create Event"});
    }
   


}


//create Speaker....
exports.createSpeaker=(request,response)=>{
    checkAuthentication(request,"admin");

    let speaker=new Speaker({
        email:request.body.email,
        userName:request.body.userName,
        password:request.body.password,
        address:request.body.Address,
      


    })
console.log(speaker);
    speaker.save();
    response.status(200).json({meassge:"Create speaker"});

}



//create Student......
exports.createStudent=(request,response)=>{
    checkAuthentication(request,"admin");

    let std=new Student({
        email:request.body.email,
        password:request.body.password,
    })
    std.save();
    response.status(200).json({meassge:"Create Student"});

}



//all Edits Return object return the state of update to check it in front ent 
//Edit Event...
exports.updateEvent=(request,response,next)=>{
    checkAuthentication(request,"admin");

    let result=validationResult(request);
        if(!result.isEmpty()){
             let Message="";
            for(let i=0;i<result.array().length;i++){
                console.log(result.array()[i].param)
               Message+=result.array()[i].param+":"+result.array()[i].msg+" ";
            }
            let err=new Error(Message);
            err.status=422;
            console.log(Message)
            throw err;
        }else{
            Eevent.findOne({_id:request.params.id}).then((eventrExist)=>{            
                Eevent.updateOne({_id:request.params.id},{$set:{title:request.body.title,date:request.body.date,
                mainSpeaker:request.body.mainSpeaker,otherSpeakers:request.body.otherSpeakers,students:request.body.students
                }}).then((s)=>{

                    response.status(200).json(s);

                })
    
                
            })
            .catch((err)=>{
                next(err);
            })
           
             
        }

}


//Edit Speaker....(without editing userName or Password)
exports.updateSpeaker=(request,response,next)=>{
    checkAuthentication(request,"admin");

        let result=validationResult(request);
        if(!result.isEmpty()){
             let Message="";
            for(let i=0;i<result.array().length;i++){
                console.log(result.array()[i].param)
               Message+=result.array()[i].param+":"+result.array()[i].msg+" ";
            }
            let err=new Error(Message);
            err.status=422;
            console.log(Message)
            throw err;
        }else{
    
            Speaker.findOne({_id:request.params.id}).then((speakerExist)=>{
                if(speakerExist==null){
                    throw new Error("this speaker is not Exists")
                }
    
                Speaker.findOne({email:request.body.email}).then((s)=>{
    
                    if(s!=null){
    
                        throw new Error("sorry,Duplicate Email");
                    }
                    
                    Speaker.updateOne({_id:request.params.id},{$set:{email:request.body.email,address:{city:request.body.address.city,street:request.body.address.street,building:request.body.address.building}}})
                    .then((s)=>{
                        
                        
                        response.status(200).json(s);
            
                    })
                    .catch((err)=>{
                        next(err);
                    });
    
                })
                .catch((err)=>{
    
                    next(err);
                })
    
                
            })
            .catch((err)=>{
                next(err);
            })
           
             
        }
    
       
    
    

}



//Edit Student......(without editing userName or Password)
exports.updateStudent=(request,response,next)=>{
    checkAuthentication(request,"admin");

    let result=validationResult(request);
    if(!result.isEmpty()){
let Message="";
        for(let i=0;i<result.array().length;i++){
            console.log(result.array()[i].param)
           Message+=result.array()[i].param+":"+result.array()[i].msg+" ";
        }
        let err=new Error(Message);
        err.status=422;
        console.log(Message)
        throw err;
    }else{

        Student.findOne({_id:request.params.id}).then((studentExist)=>{
            if(studentExist==null){
                throw new Error("this Student is not Exists")
            }

            Student.findOne({email:request.body.email}).then((s)=>{

                if(s!=null){

                    throw new Error("sorry,Duplicate Email");
                }
                
                Student.updateOne({_id:request.params.id},{$set:{email:request.body.email}})
                .then((s)=>{
                    
                    
                    response.status(200).json(s);
        
                })
                .catch((err)=>{
                    next(err);
                });

            })
            .catch((err)=>{

                next(err);
            })

            
        })
        .catch((err)=>{
            next(err);
        })
       
         
    }


}



//Delete Event....
exports.DeleteEvent=(request,response,next)=>{
    checkAuthentication(request,"admin");

    Eevent.deleteOne({_id:request.params.id}).then((s)=>{

        if(s.deletedCount==0){
    
            throw new Error("There is No Event with this id to delete");
        }
        response.status(200).json({meassge:"Event has been deleted"});
        
       }).catch((err)=>{
        next(err);
       })

}

//Delete Speaker.....
exports.deleteSpeaker=(request,response,next)=>{
    checkAuthentication(request,"admin");


   Speaker.deleteOne({_id:request.params.id}).then((s)=>{

    if(s.deletedCount==0){

        throw new Error("There is No speaker with this id to delete");
    }
    response.status(200).json({meassge:"speaker has been deleted"});
    
   }).catch((err)=>{
    next(err);
   })


}


//Delete Student
exports.deleteStudent=(request,response,next)=>{
    checkAuthentication(request,"admin");

    Student.deleteOne({_id:request.params.id}).then((s)=>{

        if(s.deletedCount==0){
    
            throw new Error("There is No Student with this id to delete");
        }
        response.status(200).json({meassge:"student has been deleted"});
        
       }).catch((err)=>{
        next(err);
       })
    
}


//add Student or Students to specific Event
exports.addStudentToEve=(request,response,next)=>{
    checkAuthentication(request,"admin");

    let result=validationResult(request);
    if(!result.isEmpty()){
         let Message="";
        for(let i=0;i<result.array().length;i++){
            console.log(result.array()[i].param)
           Message+=result.array()[i].param+":"+result.array()[i].msg+" ";
        }
        let err=new Error(Message);
        err.status=422;
        console.log(Message)
        throw err;
    }else{

        Eevent.findOne({_id:request.params.id},{students:1,_id:0}).then((s)=>{

            if(s==null){

                throw new Error("Event Not Found");
            }

            let newStudents=s.students.concat(request.body.students).map(Number);//concate the old in mongo with the incoming Students
            let unique=[...new Set(newStudents)]//convert array to Set of unique to remove redundant values and convert it back to array

            console.log(unique)
            Eevent.updateOne({_id:request.params.id},{$set:{students:unique}}).then((s)=>{

                response.status(200).json(s);
            
            })
               .catch((err)=>{

                next(err);
               })
          

     
    }).catch((err)=>{

            next(err);
    })


    }
   


}





//add otherSpeakers to specific Event
exports.addOtherSpeakersToEve=(request,response,next)=>{

    let result=validationResult(request);
    if(!result.isEmpty()){
         let Message="";
        for(let i=0;i<result.array().length;i++){
            console.log(result.array()[i].param)
           Message+=result.array()[i].param+":"+result.array()[i].msg+" ";
        }
        let err=new Error(Message);
        err.status=422;
        console.log(Message)
        throw err;
    }else{

        Eevent.findOne({_id:request.params.id},{otherSpeakers:1,_id:0}).then((s)=>{

            if(s==null){

                throw new Error("Event Not Found");
            }
            let newOtherSpeakers=s.otherSpeakers.concat(request.body.otherSpeakers).map(Number);//concate the old in mongo with the incoming Students
            let unique=[...new Set(newOtherSpeakers)]//convert array to Set of unique to remove redundant values and convert it back to array

            console.log(unique)
            Eevent.updateOne({_id:request.params.id},{$set:{otherSpeakers:unique}}).then((s)=>{

                response.status(200).json(s);
            
            })
               .catch((err)=>{

                next(err);
               })
          

     
    }).catch((err)=>{

            next(err);
    })


    }
   


}



//add MainSpeaker or MainSpeaker to specific Event
exports.addMainSpeakerToEve=(request,response,next)=>{
    checkAuthentication(request,"admin");

    console.log("sss")
    let result=validationResult(request);
    if(!result.isEmpty()){
         let Message="";
        for(let i=0;i<result.array().length;i++){
            console.log(result.array()[i].param)
           Message+=result.array()[i].param+":"+result.array()[i].msg+" ";
        }
        let err=new Error(Message);
        err.status=422;
        console.log(Message)
        throw err;
    }else{

        Eevent.findOne({_id:request.params.id},{mainSpeaker:1,_id:0}).then((s)=>{

            if(s==null){

                throw new Error("Event Not Found");
            }
            let newMainSpeaker=request.body.mainSpeaker;

            console.log(newMainSpeaker)
            Eevent.updateOne({_id:request.params.id},{$set:{mainSpeaker:newMainSpeaker}}).then((s)=>{

                response.status(200).json(s);
            
            })
               .catch((err)=>{

                next(err);
               })
          

     
    }).catch((err)=>{

            next(err);
    })


    }
   


}