const express=require ("express");
const collection=require("./mongo");
const urlData=require("./mongo2");
const cors=require("cors");
const shortId = require('shortid');
const app=express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
  const {email,pass}=req.body;
  try{
    const check=await collection.findOne({email:email})
    if(check){
        if(check.password==pass){
            res.json("exist");
        }
        else{
            
            res.json("Incorrect");
        }
        
    }
    else{
        res.json("Not exist");
    }
  }
  catch(e){
    console.log(e);
    res.json("not found");
  }
})

app.post("/register",async(req,res)=>{
    
    const data={
        email:req.body.email,
        password:req.body.pass,
        name:req.body.name
    }
    try{
      const check=await collection.findOne({email:data.email})
      if(check){
          res.json("exist");
      }
      else{
          res.json("Not exist");
          await collection.insertMany([data]);
      }
    }
    catch(e){
      console.log(e);
      res.json("not found");
    }
  })
  app.get("/register",cors(),(req,res)=>{

  })

  app.post("/home",async(req,res)=>{
    
    const data={
        full:req.body.url,
        short:req.body.shortenLink
    }
    await urlData.insertMany([data]);
    res.json("ok");
    
  })
  

  app.get("/home",cors(),async(req,res)=>{
    const answer=await urlData.find();
    res.json(answer);
  })
  app.post("/search",async(req,res)=>{


    try {
        console.log(req.body.url)
        const result = await urlData.aggregate([
            {
                '$search': {
                    'index': 'default2',
                    'text': {
                        'query': req.body.url == '' ? '' : req.body.url,
                        'path': {
                            'wildcard': '*'
                        }
                    }
                }
            }
        ])
        
        res.json(result);
       
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
  })
  app.get("/search",cors(),(req,res)=>{

  })

  

  

  app.listen(3000,()=>{
    console.log("port is runnung");
  })
