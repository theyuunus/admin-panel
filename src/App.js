import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import "./App.scss";

function App() {
  return (
    <React.Fragment>
     
      <nav>
        <Link to={"/"} >Home</Link>
        <Link to={"/admin"} >Admin</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/" element={<Admin/>} /> 
      </Routes>
      
    </React.Fragment>
  );
}

export default App;
