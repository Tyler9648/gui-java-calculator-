const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const db = mysql.createConnection({
   user: "root",
   host: "34.135.211.168",
   password: "babyblackjack648G5",
   database: "accounts",
});

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);


app.post('/login', (req, res) => {
 const email = req.body.email;
 const password = req.body.password;

 db.execute(
     "SELECT * FROM Users WHERE email = ? AND password = ?",
     [email, password],
     (err, result)=> {
         if (err) {
             res.send({err: err});
         }

         if (result.length > 0) {
             res.send( result);
             }else({message: "Wrong email/password combination!"});
         }

 );
});



app.post('/registration', (req, res) => {
 const username = req.body.username;
 const email = req.body.email;
 const password = req.body.password;

   db.execute(
     "INSERT INTO Users (username, email, password) VALUES (?,?,?)",
     [username, email, password],
     (err, result)=> {
     console.log(err);
     }
   );
});

app.use(
 cors({
 origin: ["http://localhost:3000"],
 methods: ["GET", "POST"],
 credentials: true,
 })
);



app.listen(3001, () => {
   console.log("running server");
});

