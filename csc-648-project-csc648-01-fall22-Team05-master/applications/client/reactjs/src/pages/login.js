import React, {useEffect, useState} from 'react';
import Axios from 'axios';
// import "../assets/login.css";
import "../assets/registration.css";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';
import imageL from "../assets/images/BBJ_reg.png";



function Login(){

 const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
    );
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [email, setEmail] = useState("");
 const [role, setRole] = useState("");
 const navigate = useNavigate();
 const [loginStatus, setLoginStatus] = useState("");
 //const [loginRedirect, setLoginRedirect] = useState('/login');
 var loginRedirect = '/login';

Axios.defaults.withCredentials = true;
 const login = () => {

    Axios.post("https://us-central1-csc-648-group5-babyblackjack.cloudfunctions.net/api/login", {
      email: email,
      password: password,
    }).then((response) => {

   console.log(response.data);
   console.log(response.data.message);
   console.log(response.data.message[0]);
      if (!response.data.message) {
         console.log("response data " + response.data.message);
         setLoginStatus(response.data.message); //invalid login
         console.log("invalid login, stay on login page");
      } else {
         localStorage.setItem("user", response.data.message[0]);
         localStorage.setItem("authenticated", true);
         console.log("response data " + response.data.message[0]);
         setLoginStatus (response.data.message[0]); //valid login
         console.log("valid login, redirect to main, link should be /main -> ");
         loginRedirect = '/main';
         console.log(loginRedirect);
         navigate("/main");

      }
      
   });
 };

 useEffect(() => { Axios.get("https://us-central1-csc-648-group5-babyblackjack.cloudfunctions.net/api/login").then((response) => {
    console.log("useEffect() for login called");
    if (response.data.loggedIn == true)
        {
        console.log("user is logged in, should now be redirecting");
        loginRedirect = '/main';
            setRole(response.data.user[0].role);
            }
      });
    }, []);

    return(
        <div>
          <div className = 'main'>
            <div className ='overlay'></div>
              <img src = {imageL} height = "100%" width ="100%" />
                  <div className="BodyL">
                    <div className="containerL">
                        <h1 className="label">Login</h1>
                    <form className="Login" method="Login" name="form">
                    <div className="font">Email or Username</div>
                  <input type="text" name="email"

                                onChange = { (e) => {
                                   setEmail (e.target.value);
                                }}
                                />

                  {/* <div id="email_error">Please enter your Email or Username</div> */}
                  <div className="font font1">Password</div>
                  <input type="password" name="password"

                                onChange = { (e) => {
                                   setPassword (e.target.value);
                                }}
                                />

                  {/* <div id="password_error">Please enter your Password</div> */}

                  <Link to={loginRedirect}>
                  <button type="submit" onClick={login}>Login</button>
                  </Link>

                  <div className="createAccount">
                  <Link to="/registration">
                    <button>Signup here</button>
                    </Link>
                  </div>
                </form>
              </div>
           </div>
        </div>

      </div>
      
    );
}

    
    export default Login;