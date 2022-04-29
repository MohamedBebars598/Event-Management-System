const jwt=require("jsonwebtoken");
module.exports=(request,response,next)=>{
    let token;
    let decodedToken;
    try{
       token=request.get("Authorization").split(" ")[1];
       decodedToken= jwt.verify(token,process.env.Event_Token);
       //authenticated
        console.log(decodedToken.role)
        request.role=  decodedToken.role;
  
    next();
    }
    catch(error)
    {
        next(new Error("Not Authenticated"));
    }


}