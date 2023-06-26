const mongoose=require("mongoose");
mongoose.connect('mongodb+srv://prachii1408:cJHf9FKat5Se7cwp@prachi.z9krwxd.mongodb.net/')
.then(()=>{
    console.log("mongodb2 connected");
})
.catch(()=>{
    console.log("failed");
})
const urlSchema=new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true
    },
    description:{
        type:String,
    }
   
})

const urlData=mongoose.model("urlData",urlSchema);

module.exports=urlData;