import React  from "react";
import './App.css';
import Home from "./Home";
import Search from "./Search"
import {Route,Routes} from "react-router-dom";

function App() {
  
  return (
   <div className="App">
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<Search />} />
    
   </Routes>
   </div>
  );
}

export default App;
