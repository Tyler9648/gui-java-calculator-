import React from "react";
// import Card from 'react-playing-card';
import image from '../assets/projectimage.jpeg';
import {BrowserRouter as Router, Link} from 'react-router-dom';


class Body extends React.Component {
    render(){
        return(
          <div className = 'main'>
            <div className ='overlay'></div>
            <img src = {image} height = "100%" width ="100%" />
            {/* <video src={videobg} autoPlay loop/> */}
            
        

            <div className ="font-effect-neon">

                <h1>Welcome to BabyBlackjack</h1> 
                {/* < button className="signup" href="#link">Signup</button>
                < button className="signin" href="#link">Signin</button> */}
            </div>
            <Link to="/game">
          <button className="playbutton">Play as guest</button>
        </Link>
             
            {/* <Card rank="K" suit="S" /><Card rank="B" suit="S" /> */}

        </div>

            


   


        );
    }
}
export default Body;