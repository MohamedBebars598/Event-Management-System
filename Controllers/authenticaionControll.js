const Student=require("../Models/StudentSchema");
const Speaker=require("../Models/SpeakersSchema");
const jwt=require("jsonwebtoken");
const {validationResult}=require("express-validator");
const bcrypt=require("bcrypt");
exports.getToken=(request,response,next)=>{

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



let Email=request.body.email;
let pass=request.body.password;
let token;

if(Email=="eventAdmin@gmail.com"&&pass=="Iti@1234"){

    token=jwt.sign({email:Email,role:"admin"},process.env.Event_Token,{expiresIn:"1h"});
    response.status(200).json({token,meassge:"login"});
}else{

console.log(request.params.role)
    if(request.params.role=="student"){


        Student.findOne({email:Email}).then((d)=>{

            console.log(bcrypt.compareSync(pass,d.password));

            if(d==null||!bcrypt.compareSync(pass,d.password)){
                throw Error("invalid User Name or Password");

            }
        
            token=jwt.sign({id:d._id,email:Email,role:"student"},process.env.Event_Token,{expiresIn:"1h"});
            response.status(200).json({token,meassge:"login"});
        
            }).catch((err)=>{
        
            next(err);
        })
    }else{

        console.log("else")
        Speaker.findOne({email:Email}).then((d)=>{

                    if(d==null||!bcrypt.compareSync(pass,d.password)){
    
                        throw Error("invalid User Name or Password");
                    }
                    token=jwt.sign({id:d._id,email:Email,role:"speaker"},process.env.Event_Token,{expiresIn:"1h"});
                    response.status(200).json({token,meassge:"login"});
    
                }).catch((err)=>{
    
                    next(err);
                })

    }
}




    




}










        // if(d==null){
         
        //     Speaker.findOne({email:Email,password:pass}).then((d)=>{

        //         if(d==null){

        //             throw Error("invalid User Name or Password");
        //         }
        //         token=jwt.sign({email:Email,role:"speaker"},process.env.Event_Token,{expiresIn:"30m"});
        //         response.status(200).json({token,meassge:"login"});

        //     }).catch((err)=>{

        //         next(err);
        //     })
        // }