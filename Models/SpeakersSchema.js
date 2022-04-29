const mongoose=require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const connection=mongoose.connection;

autoIncrement.initialize(connection);

//bulid Event Schema 
speakerSchema=new mongoose.Schema({
    
    email:{type:String,unique:true},
    userName:{type:String,required:true},
    password:{type:String,required:true},
    address:{city:String,street:String,building:String},
  
})

speakerSchema.plugin(autoIncrement.plugin,{
    model:"Speaker",
    startAt: 1,
    incrementBy: 1
})
module.exports=mongoose.model("Speaker",speakerSchema);