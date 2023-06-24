import React ,{useState} from "react";
import './App.css';
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Search from "./Search"
import {Route,Routes} from "react-router-dom";

function App() {
  
  return (
   <div className="App">
   <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/search" element={<Search />} />
    
   </Routes>
   </div>
  );
}

export default App;
