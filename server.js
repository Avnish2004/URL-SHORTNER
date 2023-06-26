const express=require ("express");
const urlData=require("./mongo2");
const cors=require("cors");
const path = require("path");
const app=express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(path.join(__dirname, "my-app", "build")));





  app.post("/",async(req,res)=>{
    
    const data={
        full:req.body.url,
        short:req.body.shortenLink,
        description:req.body.desc
    }
    await urlData.insertMany([data]);
    res.json("ok");
    
  })
  

  app.get("/",async(req,res)=>{
    const answer=await urlData.find();
    res.json(answer);
  })
  app.post("/search",async(req,res)=>{


    try {
        
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
  
  app.listen(3000,()=>{
    console.log("port is runnung");
  })