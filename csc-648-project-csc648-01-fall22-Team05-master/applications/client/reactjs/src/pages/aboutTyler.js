import React from "react";
import TylerImage from "../assets/images/image0.jpg";



function AboutTyler(){
    return (
        <div>
            <>
  
  <div className="container">
    <header className="header">
      <h1>Tyler Hsieh </h1>
    </header>
  </div>
  <aside className="left">
    <img src={TylerImage}style={{ width: "450px", height:"350px"}} className="pic" />
    <br />
    <br />
  </aside>
  <main className="content">
    <h2>About Me</h2>
    <p>
      {" "}
      Hello! I am fourth year Computer Science student in SFSU. I am the Github
      master and backend lead for this project. I'm looking forward to
      struggling and learning along the way!{" "}
    </p>
    <h3>Personality and hobbies</h3>
    <p>I am simple and a bit lazy. I like video games, fishing, and cooking.</p>
    <hr />
    <br />
  </main>
  <footer className="footer">
    {" "}
    email - thsieh3@mail.sfsu.edu <br /> Thanks for stopping by!
  </footer>
</>
        </div>
    )
}

export default AboutTyler;