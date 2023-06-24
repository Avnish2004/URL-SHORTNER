import React,{useState} from 'react';
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";

const Register = () => {
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [name,setName]=useState("");
    const history=useNavigate();

 
    async function handleSubmit(e){
        e.preventDefault();
        try{
          await axios.post("http://localhost:3000/register",{name,email,pass})
          .then(res=>{
            if(res.data=="exist"){
                alert("User has already signed in")
            }
            else if(res.data=="Not exist"){
                history("/home",{state:{id:name}})
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
    <form className="register-form" onSubmit={handleSubmit}>
    <h2>Register</h2>
    <label htmlFor='name'>Full name</label>
    <input value={name} placeholder="full name" onChange={(e)=>setName(e.target.value)} name="name" id="name" ></input>
<label htmlForfor="email">Email</label>
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='youremail@gmail.com' id="email" name="email"></input>
    <label htmlForfor="password">Password</label>
    <input type="password" value={pass}  onChange={(e)=>setPass(e.target.value)} placeholder='********' id="password" name="password"></input>
    <button type="submit">Register</button>
</form>
<button className="link-btn" ><Link to="/">Already have an account? Log In here</Link></button>
</div>
  )
}

export default Register
