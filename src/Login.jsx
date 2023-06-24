import React,{useState} from 'react';
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";

const Login = () => {
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const history=useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
          await axios.post("http://localhost:3000/",{email,pass})
          .then(res=>{
            if(res.data=="exist"){
                history("/home",{state:{id:email}})
            }
            else if(res.data=="Incorrect"){
                console.log("hello");
                alert("Incorrect password")
            }
            else if(res.data=="Not exist"){
                alert("Please register")
            }
           
          })
          .catch(e=>{
            alert("Wrong details");
            console.log(e);
          })
        }
        catch(e){
            console.log(e);
        }
       
    }
  return (
    <div className='auth-form-container'>
        <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
    <label htmlForfor="email">Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='youremail@gmail.com' id="email" name="email"></input>
        <label htmlForfor="password">Password</label>
        <input type="password" value={pass}  onChange={(e)=>setPass(e.target.value)} placeholder='********' id="password" name="password"></input>
        <button type="submit">Log In</button>
    </form>
    <button className="link-btn" ><Link to="/register">Don't have an account? Register here</Link></button>
    </div>
    
  )
}

export default Login;
