import React from 'react'
import {useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import UserData from "./userData";
import axios from "axios";
const Search = () => {
  const [url,setUrl]=useState("");
  const [list,setList]=useState([]);
  const history=useNavigate();

  const handleChange=(e)=>{
    setUrl(e.target.value);
  }
  

  async function handleClick(e){
    e.preventDefault();
    await axios.post("http://localhost:3000/search",{url})
        .then(res=>{
          console.log(res.data);
           setList(res.data);
            
        })
  }
  return (
    
    <div className="global">
    <div className="navbar">
    <Link to="/home" className="navLink">Go back to URL Shortner</Link>
    <h1>URL Search</h1>
    </div>
    <div className="home">
    <form className="react" onSubmit={handleClick}>
     <input value={url} onChange={handleChange} placeholder="www.google.com" className="input" name="url"></input>
     <button className="shrink" type="submit">Search Url</button>
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
    </div>
   
    </div>
  )
}

export default Search

