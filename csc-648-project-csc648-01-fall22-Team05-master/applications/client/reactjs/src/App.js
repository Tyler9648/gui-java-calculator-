import Axios from 'axios';
import React, {Component, useEffect, useState } from "react";
import "./App.css";
import {BrowserRouter as  Router, Route,Routes, Link, Redirect } from "react-router-dom";

//importing Pages
import Home from "./pages/home";
import Aboutus from "./pages/aboutus";
import Registration from "./pages/registration";
import Login from "./pages/login";
import AboutPritam from "./pages/aboutPritam";
import AboutSeng from "./pages/aboutSeng";
import AboutLane from "./pages/aboutLane";
import AboutNate from "./pages/aboutNate";
import AboutSneha from "./pages/aboutSneha";
import AboutTyler from "./pages/aboutTyler";
import Main from "./pages/main";
import Game from "./pages/game";





class App extends Component{
  render(){
    return (
    <Router>
     <Routes>

      <Route exact path="/" element ={<Home/>} />
      <Route exact path="/aboutus" element={<Aboutus/>} />
      <Route exact path="/registration" element={<Registration/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/aboutPritam" element={<AboutPritam/>} />
      <Route exact path="/aboutSeng" element={<AboutSeng/>} />
      <Route exact path="/aboutLane" element ={<AboutLane/>}/>
      <Route exact path="/aboutNate" element ={<AboutNate/>}/>
      <Route exact path="/aboutSneha" element ={<AboutSneha/>}/>
      <Route exact path="/aboutTyler" element ={<AboutTyler/>}/>
      <Route exact path="/main" element ={<Main/>}/>
      <Route exact path="/game" element ={<Game/>}/>
      

      </Routes>
     
      </Router>

    );
  }
}

export default App;