import React from "react";
import PritamImage from "../assets/images/IMG_0650.jpg";


function aboutPritam(){
    return(
      <div>
      <div  style={{ backgroundColor: "#aaa" }}>
  <h1>About Me</h1>
  <h2> Hi, my name is Pritam Gautam. I am Senior student. </h2>
  <h2> I am working as a Frontend lead in this project.</h2>
  <div className="pritamcss">
    <img src={PritamImage} alt="Pritam" style={{ width: 250, height: 250 }} />
   
    <p></p>
  </div>
 
  <div className="skills column">
    <h3>My Skills</h3>
    <ul id="skill-list">
      <li>Web Development</li>
      <li>Design process</li>
    </ul>
  </div>
 
  <div className="footer">
    <h3>More About Me</h3>
    <p>
      I'm highly energetic and motivated person. I love Jamming with my friends.
      I also love playing around with the features of webpage design.
    </p>
    <p>Email me @ pgautam@sfsu.edu</p>
    </div>
  </div>
  </div>
  

    )
}
export default aboutPritam;

