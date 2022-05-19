const Student=require("../Models/StudentSchema");
const Event=require("../Models/EventsSchema");
const {validationResult}=require("express-validator");
const checkAuthentication=require("../AuthenticationMiddleware/Autherization");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");//to decode the token


//getRigstered Events for specific Student...
exports.getAllRegisterdEve=(request,response,next)=>{
    checkAuthentication(request,"student");

let stdId=request.params.id;

Event.find({students:{$elemMatch:{$eq:stdId}}})
.populate("mainSpeaker").populate("otherSpeakers").populate("students").then((s)=>{
    
    if(s.length==0){

        throw new Error("No Event has Registered Student No."+stdId)
        
    }
    response.status(200).json(s);
  
})
.catch((err)=>{
    console.log("err")
  next(err);
})



}

// get Student info...
exports.getStudent=(request,response,next)=>{
    checkAuthentication(request,"student");

    let stdId=request.params.id;
    token=request.get("Authorization").split(" ")[1];
    let tokenStdId=jwt.verify(token,process.env.Event_Token);

    if(tokenStdId.id!=stdId){

        throw new Error("somthing might went Wrong");
    }
    Student.findOne({_id:stdId}).then((s)=>{
        if(s==null){

            throw new Error("student No."+stdId+" Not Found");
            
        }
        response.status(200).json(s);
    })
    .catch((err)=>{

       next(err);       
    })
  

}



//Edit student Data....
exports.updateStudent=(request,response,next)=>{
    checkAuthentication(request,"student");

    //this to make sure the user that request is the same who want to change his own data
    let stdId=request.params.id;
    token=request.get("Authorization").split(" ")[1];
    let tokenStdId=jwt.verify(token,process.env.Event_Token);

    if(tokenStdId.id!=stdId){

        throw new Error("somthing might went Wrong");
    }

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

            Student.findOne({_id:{$ne:request.params.id},email:request.body.email}).then((s)=>{

                if(s!=null){

                    throw new Error("sorry,Duplicate Email");
                }
                
                Student.updateOne({_id:request.params.id},{$set:{email:request.body.email,password:bcrypt.hashSync(request.body.password,10)}})
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



//sign up Controller...
exports.studentSignUp=(request,response,next)=>{

    console.log("studetn controll")
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
            Student.findOne({email:request.body.email}).then((d)=>{

                if(d!=null){

                    throw new Error("duplicate Email..");
                }
               const hashPass= bcrypt.hashSync(request.body.password,10);
                let std=new Student({
                    email:request.body.email,
                    password:bcrypt.hashSync(request.body.password,10),
                  
                })
            console.log(std);
                std.save();
                response.status(200).json({Message:"login successful"})

                
            }).catch((s)=>{
                next(s);
            })
           
        }

    
}