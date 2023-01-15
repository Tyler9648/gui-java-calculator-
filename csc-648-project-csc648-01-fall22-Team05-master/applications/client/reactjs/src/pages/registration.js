import React, { useEffect, useState } from "react";
import Axios from 'axios';
import "../assets/registration.css";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import imageR from "../assets/images/BBJ_log.png";


function Registration(){
const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState("");
const [emailReg, setEmailReg] = useState("");
//const [username, setUsername] = useState("");
//const [password, setPassword] = useState("");
//const [email, setEmail] = useState("");

 const register = () => {
    Axios.post("https://us-central1-csc-648-group5-babyblackjack.cloudfunctions.net/api/registration", {
      username: usernameReg,
      email: emailReg,
      password: passwordReg,

    }).then((response) => {
      console.log(response);
    });
 };

    return(
      <div className = 'main'>
      <div className ='overlay'></div>
        <img src = {imageR} height = "100%" width ="100%" />
            <div className="BodyR">
              <div className="containerL">  
    <h6 id="loginHeader">Registration</h6>
    <div id="error">
     
    </div>
    <form className="RegistrationForm">
      <div>
        <input
          type="text"
          name="userName"
          id="userName"
          className="entryField"
          required=""
          placeholder="Username"

          onChange={(e) => {
              setUsernameReg(e.target.value);
          }}

        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          className="entryField"
          required=""
          placeholder="Email Address"

          onChange={(e) => {
              setEmailReg(e.target.value);
          }}

        />
      </div>
      <div>
        <input
          type="password"
          name="passWord"
          id="passWord"
          className="entryField"
          required=""
          placeholder="Password"

          onChange={(e) => {
              setPasswordReg(e.target.value);
          }}

        />
      </div>
      <div>
        <input
          type="password"
          name="passWord"
          id="passWord2"
          className="entryField"
          required=""
          placeholder="Re-enter Password"
        />
      </div>
      <div>
      <button onClick={register} >Register</button>
      </div>
    </form>
    <div className="new">
      <h8>Already have an Account?</h8>
    </div>
    <div className="createAccount">
      <h7>
        {" "}
        <Link to="/login">
          <button>login</button>
        </Link>
      </h7>
    </div>

  </div>
        </div>
        </div>
       
    )
}

export default Registration;