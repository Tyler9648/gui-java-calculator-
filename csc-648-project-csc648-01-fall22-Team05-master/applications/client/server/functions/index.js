const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require('bcrypt');
const saltRound = 10;

//const db = mysql.createConnection({
//   user: "root",
//   host: "34.135.211.168",
//   password: "babyblackjack648G5",
//   database: "accounts",
//});

const dbconfig = {
  user: "root",
   host: "34.135.211.168",
   password: "babyblackjack648G5",
   database: "accounts",
   connectionLimit: 100,
}

const db = mysql.createPool(dbconfig);

app.use(express.json());
app.use(
    cors({
        origin: true ,
    methods: ["GET", "POST"],
      credentials: true,
    })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session ({
        key: "__session",
        secret: "testsecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

app.get("/login", (req, res) => {
console.log("app.get() for login");
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post('/login', (req, res) => {
 const email = req.body.email;
 const password = req.body.password;
 console.log("login clicked");
   db.execute(
     "SELECT * FROM Users WHERE email = ? AND password = ?",
     [email, password],
     (err, result)=> {
     console.log("info pulled from db");
         if (err) {
        console.log("error: " + err);
             res.send({err: err});
         }

         if (result.length > 0) {
    //        if (response) {
            console.log("Valid login");
            req.session.user = result;
            console.log(req.session.user);
            res.send({message: result});

    //         }else{res.send({ message: "Wrong email/password combination!"});
    //         }

         } else {
         console.log("User doesn't exist/invalid login");
             res.send({ message: ""});

         }

    });
});



app.post('/registration', (req, res) => {
 const username = req.body.username;
 const email = req.body.email;
 const password = req.body.password;
 console.log("registering account!");
   db.execute(
     "INSERT INTO Users (username, email, password) VALUES (?,?,?)",
     [username, email, password],
     (err, result)=> {
     console.log(err + email);
     }
   );

//db.release();
});




app.listen(5001, () => {
   console.log("running server");
});

const api = functions.https.onRequest(app);

module.exports = { api };