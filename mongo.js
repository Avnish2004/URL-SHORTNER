const mongoose=require("mongoose");
mongoose.connect('mongodb+srv://prachii1408:cJHf9FKat5Se7cwp@prachi.z9krwxd.mongodb.net/')
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed");
})

const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
})

const collection=mongoose.model("collection",newSchema);

module.exports=collection;