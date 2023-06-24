import React from 'react';
import {useState,useEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import img1 from "./url.png";
import UserData from './userData';


const Home = () => {
  const [list,setList]=useState([]);
  const [url,setUrl]=useState("");
  useEffect(()=>{
    axios.get(`http://localhost:3000/home`).then((res)=>{
      console.log(res.data);
     setList(res.data);
  }) 
},[]);
    const location=useLocation();
   
    const history=useNavigate();


    async function handleClick(e){
      e.preventDefault();
      try{
        const res=await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const shortenLink=res.data.result.full_short_link;
        console.log(shortenLink);
        await axios.post("http://localhost:3000/home",{url,shortenLink})
        .then(res=>{
          
            console.log("ok");
            history("/home",{state:{id:url}})
            axios.get(`http://localhost:3000/home`).then((res)=>{
              console.log(res.data);
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
     <button className="shrink" type="submit">Shrink Url</button>
     </form>
     <table>
         <thead>
         <tr>
         <th>Full URl</th>
          <th>Short URL</th>
         </tr>
         
         </thead>
         <tbody>
          <UserData users={list} />
         </tbody>
     </table>
    
     {/* <h2 className='top'>Hello {location.state.id} and welcome to this page</h2>  */}
    </div>
    
    </div>
   
  )
}

export default Home
