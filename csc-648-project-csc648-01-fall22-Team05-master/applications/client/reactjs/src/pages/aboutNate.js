import React from "react";
import NateImage from "../assets/images/Screenshot_20220908-105739.png";



function AboutNate(){
    return(
        <div>
            <div className="row">
  <div className="column" style={{ backgroundColor: "#aaa" }}>
    <h2>Nathaniel Miller</h2>
    <p>email: nmiller7@sfsu.edu</p>
    <p>Student ID: 922024360</p>
    <p>
      Github: <a href="https://github.com/nmiller7sfsu">nmiller7sfsu</a>
    </p>
  </div>
  <div className="column" style={{ backgroundColor: "#bbb" }}>
    <img src={NateImage} alt="Nate pic" />
  </div>
  <div className="column" style={{ backgroundColor: "#aaa" }}>
    <h2>About Me</h2>
    <p>Hello, I am Nathaniel Miller.</p>
    <p>I'm a part of group 5 this semester working on the back end team. </p>
    <p>This is my second year at SFSU after transfering. </p>
    <p>
      Based on my about page I'm sure you can tell that web development is not
      my strong suit. I prefer much lower level development.{" "}
    </p>
    </div>
  </div>
</div>
    )
}

export default AboutNate;