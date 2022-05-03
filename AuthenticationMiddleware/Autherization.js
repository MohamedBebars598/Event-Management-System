module.exports=(request,type)=>{

    if(request.role!=type){
        console.log(request.role);
        throw new Error("not Authorized");

    }
}