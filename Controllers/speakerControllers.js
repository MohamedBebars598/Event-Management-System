const events=require("../Models/EventsSchema");
const Speaker=require("../Models/SpeakersSchema");
const mongoose=require("mongoose");
const { validationResult } = require("express-validator");
const checkAuthentication=require("../AuthenticationMiddleware/Autherization");
const express=require("express")
const bcrypt=require("bcrypt");
const server=express();
const jwt=require("jsonwebtoken");//to decode the token
//getRegistered Events /speaker/events/:id
exports.getRegisteredEvents=(request,response,next)=>{
    checkAuthentication(request,"speaker");
    let stdId=request.params.id;
    events.find({$or:[{mainSpeaker:stdId},{otherSpeakers:{$elemMatch:{$eq:stdId}}}]})
    .populate("mainSpeaker").populate("otherSpeakers").populate("students").then((s)=>{

        if(s.length==0){

            throw new Error("No Events Registered for Speaker No."+stdId)
            
        }      
        
        setTimeout(()=>{
            response.status(200).json(s);
        },1500)
    })
    .catch((err)=>{

        next(err);      
    })
   
}

//Edit Speaker Data....
exports.updateSpeaker=(request,response,next)=>{
    //console.log(request.role)
    checkAuthentication(request,"speaker");
    console.log(request.body);
    let result=validationResult(request);
    if(!result.isEmpty()){
let Message="";
        for(let i=0;i<result.array().length;i++){
            console.log(result.array()[i].param)
           Message+=result.array()[i].param+":"+result.array()[i].msg+" ";
        }
        let err=new Error(Message);
        err.status=422;
        //console.log(Message)
        throw err;
    }else{

        Speaker.findOne({_id:request.params.id}).then((speakerExist)=>{
            if(speakerExist==null){
                throw new Error("this speaker is not Exists")
            }

            Speaker.findOne({_id:{$ne:request.params.id},email:request.body.email}).then((s)=>{

                if(s!=null){

                    throw new Error("sorry,Duplicate Email");
                }
                
                Speaker.updateOne({_id:request.params.id},{$set:{email:request.body.email,userName:request.body.userName,password:bcrypt.hashSync(request.body.password,10)
                    ,address:{city:request.body.address.city,street:request.body.address.street,building:request.body.address.building}}})
                .then((s)=>{
                    
                    
                    response.status(200).json({Message:"speaker updated",s});
        
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

// get Speaker info...
exports.getSpeaker=(request,response,next)=>{
    checkAuthentication(request,"speaker");


  
    let speakId=request.params.id;
    token=request.get("Authorization").split(" ")[1];
    let tokenStdId=jwt.verify(token,process.env.Event_Token);

    if(tokenStdId.id!=speakId){
       

        throw new Error("somthing might went Wrong");
    }
    console.log(speakId)
    Speaker.findOne({_id:speakId}).then((s)=>{
       
        if(s==null){
            throw new Error("student No."+speakId+" Not Found");
            
        }
        setTimeout(()=>{
            response.status(200).json(s);
        },1500)
    })
    .catch((err)=>{
       next(err);       
    })
  

}



//sign up Controller...
exports.speakerSignUp=(request,response,next)=>{

    console.log("speaker controll")
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
    }
        else{
            Speaker.findOne({email:request.body.email}).then((d)=>{

                if(d!=null){

                    throw new Error("duplicate Email..");
                }

                let speaker=new Speaker({
                    email:request.body.email,
                    userName:request.body.userName,
                    password:bcrypt.hashSync(request.body.password,10),
                    address:{city:request.body.city,street:request.body.street,building:request.body.building},
                })
            console.log(speaker);
                speaker.save();"email=eventAdmin@gmail.com&password=Iti@1234"
                response.status(200).json({Message:"login"})

                
            }).catch((s)=>{
                next(s);
            })
           
        }

    
}



//Delete Events ------> Bonus
exports.deleteEvents=(request,response,next)=>{
    checkAuthentication(request,"speaker");
   

    events.findOne({_id:request.params.eid,$or:[{mainSpeaker:request.params.sid},{otherSpeakers:{$elemMatch:{$eq:request.params.sid}}}]}).then((data)=>{

      if(data==null){

        throw new Error("event or student is not found")
      }
     
    if(data.mainSpeaker==request.params.sid){

        data.mainSpeaker=null;
    }else{

        let x=data.otherSpeakers.indexOf(request.params.sid);
        data.otherSpeakers.splice(x,1);
    }
      data.save();

      response.status(200).json({meassge:"Delete Events"});

        
    }).catch((err)=>{

        next(err);
    })

     
}


