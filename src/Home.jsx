
import React from 'react';
import {useState} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";

import UserData from './userData';


const Home = () => {
  const [list,setList]=useState([]);
  const [url,setUrl]=useState("");
  const [desc,setDesc]=useState("");

    const location=useLocation();
   
    const history=useNavigate();

  async function handleSubmit(e){
    axios.get(`http://localhost:3000/`).then((res)=>{
             
             setList(res.data);
          })
  }
    async function handleClick(e){
      e.preventDefault();
      try{
        const res=await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const shortenLink=res.data.result.full_short_link;
        console.log(shortenLink);
        await axios.post("http://localhost:3000/",{url,shortenLink,desc})
        .then(res=>{
          
           
            history("/",{state:{id:url}})
            axios.get(`http://localhost:3000/`).then((res)=>{
              
             setList(res.data);
          })
            
        })
      }
      catch(e){
        console.log(e);
      }
    }
    
  
  return (
    <div className="global">
    <div className="navbar">
      
      <Link to="/search" className="navLink">Search for Url</Link>
      <h1>URL Shortener</h1>
    </div>
    <div className="home">
      
     <form className="react" onSubmit={handleClick}>
     <input type="url" value={url} onChange={(e)=>{setUrl(e.target.value)}} placeholder="www.google.com" className="input" name="url"></input>
     <input value={desc} onChange={(e)=>{setDesc(e.target.value)}} placeholder="Add a short description" className="input2" name="description"></input>
     <button className="shrink" type="submit">Shrink Url</button>
     <button className="shrink" onClick={handleSubmit}>See all URLs</button>
  
     </form>
     <table>
         <thead>
         <tr>
         <th className="full">Full URl</th>
          <th>Short URL</th>
          <th>Description</th>
         </tr>
         
         </thead>
         <tbody>
          <UserData users={list} />
         </tbody>
     </table>
    
    </div>
    
    </div>
   
  )
}

export default Home
