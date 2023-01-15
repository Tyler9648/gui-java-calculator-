import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image1 from '../assets/images/IMG_0650.jpg';
import image2 from '../assets/images/520705DB-DA1A-4C67-BAD4-46551BEC1EF1.jpg';
import image3 from '../assets/images/image0.jpg';
import image4 from '../assets/images/AC6D86E2-3369-4913-8B08-1EA12FF4C530.jpg';
import image5 from '../assets/images/IMG_2626.JPG';
import image6 from '../assets/images/Screenshot_20220908-105739.png';
import "../assets/aboutus.css";
import {BrowserRouter as Router, Link} from 'react-router-dom';

function Aboutus() {
  return (
    <div>
    <div className="about-section">
    <h1>Software Engineering class SFSU</h1>
    <h2>Fall 2022</h2>
    <h3>Section 01</h3>
        <h4>Team 05</h4>
  </div>
  <h2 style={{ textAlign: "center" }}>Our Team</h2>
  <div className="row">
    <div className="column">
      <div className="card">
        <img src={image1} alt="Pritam" style={{ width: "450px", height:"350px"}} />
        <div className="container">
          <h2>Pritam</h2>
          <p className="title">Frontend Lead </p>
          <p>
          <Link to="/aboutPritam">
          <button>Find More</button>
        </Link>
            {/* <button className="button" href = "/aboutPritam" >Find more</button> */}
          </p>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="card">
        <img src={image2} alt="Seng" style={{ width: "450px", height:"350px" }} />
        <div className="container">
          <h2>Seng</h2>
          <p className="title">Team Lead</p>
          <p>
          <Link to="/aboutSeng">
          <button>Find More</button>
        </Link>
          </p>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="card">
        <img src={image3} alt="Tyler" style={{width: "450px", height:"350px"   }} />
        <div className="container">
          <h2>Tyler</h2>
          <p className="title">Github/BackendLead</p>
          <Link to="/aboutTyler">
          <button>Find More</button>
        </Link>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="card">
        <img src={image4} alt="Sneha" style={{ width: "450px", height:"350px"}} />
        <div className="container">
          <h2>Sneha</h2>
          <p className="title">Frontend Developer</p>
          <Link to="/aboutSneha">
          <button>Find More</button>
        </Link>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="card">
        <img src={image5} alt="Lane" style={{ width: "450px", height:"350px"}} />
        <div className="container">
          <h2>Lane</h2>
          <p className="title">Backend Lead</p>
          <Link to="/aboutLane">
          <button>Find More</button>
        </Link>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="card">
        <img src={image6} alt="Nate" style={{ width: "450px", height:"350px"}} />
        <div className="container">
          <h2>Nate</h2>
          <p className="title">Backend developer</p>
          <Link to="/aboutNate">
          <button>Find More</button>
        </Link>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}

export default Aboutus;






