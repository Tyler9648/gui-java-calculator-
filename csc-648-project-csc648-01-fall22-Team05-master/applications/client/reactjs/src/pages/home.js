import React from 'react';
import Body from "./body";
import Footer from '../components/Footer';

import Navbar from '../components/Navbar';

import "../App.css";

function Home() {
  
  return( 
   <div className = "Home">
     <div><Navbar /></div>
    <div><Body /></div>
  
   <div><Footer/></div>
   

  </div>

  );
}

export default Home;

//ready to push


