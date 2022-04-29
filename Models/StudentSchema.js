const mongoose=require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const connection=mongoose.connection;
autoIncrement.initialize(connection);

//bulid Event Schema 
studentSchema=new mongoose.Schema({
    
    email:{type:String,unique:true},
    password:String,
})

studentSchema.plugin(autoIncrement.plugin,{
    model:"Student",
    startAt: 1,
    incrementBy: 1
})
module.exports=mongoose.model("Student",studentSchema);