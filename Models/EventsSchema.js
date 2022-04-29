const mongoose=require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const connection=mongoose.connection;
autoIncrement.initialize(connection);

//bulid Event Schema 
eventSchema=new mongoose.Schema({
    
    title:{type:String,required:true},
    date:Date,
    mainSpeaker:{type:Number,ref:"Speaker"},
    otherSpeakers:[{type:Number,ref:"Speaker"}],
    students:[{type:Number,ref:"Student"}]


})

eventSchema.plugin(autoIncrement.plugin,{
    model:"Events",
    startAt: 1,
    incrementBy: 1

})

module.exports=mongoose.model("Events",eventSchema);


