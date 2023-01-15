import React from "react";
import LaneImage from "../assets/images/IMG_2626.JPG"

function AboutLane(){
    return(
        <div>


  <div className="container">
    <h1>Lane Maimone</h1>
    <h2>Backend Engineer and Game Designer</h2>
    <div className="image" >
      <img src={LaneImage } style={{ width: "450px", height:"350px"}}alt="A little picture of Me" />
    </div>
    <p>
      Hello Everyone! I am a senior Computer Science student at San Francisco
      State University. I enjoy snowboarding, cooking, and hangingout with my
      friends and family. Some of my passions include game design and
      mathematics, so I am eager to be apart of the Baby Blackjack Project. If
      you would like to get into contact with me here are some of my favorite
      ways of being reached.
    </p>
    <a href="#" className="btn">
      Get In Touch
    </a>
  </div>
        </div>
    )
}

export default AboutLane;