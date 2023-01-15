import React from "react";
import SengImage from "../assets/images/520705DB-DA1A-4C67-BAD4-46551BEC1EF1.jpg";


function aboutSeng(){
    return( 
        <div>
            <style
    dangerouslySetInnerHTML={{
      __html:
        "\n   \n    body {\n\t\n      margin: 0;\n      box-sizing: border-box;\n\t  background:#636262;\n    }\n\n    .container {\n      line-height: 150%;\n    }\n\n    .header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding:7px;\n      background-color: #7b7d7eaf;\n    }\n\n    .header h1 {\n      color: #fafcefaf;\n      font-size: 50px;\n      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\n    }\n\n\t\n    .left {\n\t  \n      float: left;\n      width: 300px;\n      margin: 0;\n      padding: 1em;\n    }\n\t.left p{\n\t\tcolor:#fafcefaf;\n\t}\n\t.pic {\n\t\n\t height: 300px;\n\t \n\t}\n\n    .content {\n\t  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\t  color: #e1e1d1;\n      margin-left: 190px;\n      border-left: 1px solid #d4d4d4;\n      padding: 6em;\n      overflow: hidden;\n    }\n\t.footer {\n      padding: 150px 20px;\n\t  background-color: #7b7d7eaf;\n      color: white;\n      text-align: center;\n    }\n\n\n\n\n  "
    }}
  />
  <div className="container">
    <header className="header">
      <h1>Seng Maw </h1>
    </header>
  </div>
  <aside className="left">
    <img src={SengImage} className="pic" />
    <br />
    <br />
  </aside>
  <main className="content">
    <h2>About Me</h2>
    <p>
      {" "}
      Hello! I am senior Computer Science student in SFSU graduating this
      semester. I am working as Team leader for our project. I am excited to
      learn a lot from this project!{" "}
    </p>
    <h3>Personality and hobbies</h3>
    <p>
      I am fun and optimistic. I like being productive. I enjoy reading, drawing
      and skating. And FOOD!
    </p>
    <hr />
    <br />
  </main>
  <footer className="footer">
    {" "}
    email - smaw@mail.sfsu.edu <br /> Thanks for visiting!
  </footer>
        </div>



    )
}

export default aboutSeng;