import React from "react";
import snehaImage from "../assets/images/AC6D86E2-3369-4913-8B08-1EA12FF4C530.jpg";


function AboutSneha() {
    return(
        <div>
            <meta chardet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./#aboutSneha.css" />
  <title>About Sneha Page</title>
  <div className="container">
    <h1>Sneha Shrestha</h1>
    <h2> Front-end Developer</h2>
    <h2>📧 sshrestha8@mail.sfsu.edu </h2>
    <div className="image">
      <img src={snehaImage} alt="Sneha's photo" />
    </div>
    <p>
      Thank You for visiting my profile! My name is Sneha Shrestha. I am a
      senior student majoring in Computer Science in SFSU. In this Fall 2022
      semester, for our Software Engineering class, we are making a game called
      Baby blackjack as our group project. We are a team of 6 members, and for
      this project I am working as a Front-end Developer. This is really going
      to be an exciting game, because this game has some exciting features like
      adding multiplayer. I hope you all enjoy the game our team created.
    </p>
  </div>
        </div>
    )
    
}
export default AboutSneha;