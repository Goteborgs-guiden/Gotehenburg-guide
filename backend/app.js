const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2")
const port = 3000;
const database = require("./sql")

const quiz = require('./routes/quiz')
const register = require('./routes/register')

app.use("/quiz", quiz)
app.use("/register/", register)

app.listen(port, () => {
    database.createtable();
    database.createtableForRegiseter();
    console.log(`app listening on port ${port}`);
});
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));


// app.use(express.json())
// app.use(express.urlencoded({ extended: true}));
// app.post("/register", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//
//         database.con2.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         var sql = "INSERT INTO account (username, password) VALUES ";
//             database.con2.query({
//                 sql: 'INSERT INTO account (username, password) VALUES (?, ?)',
//                 values: [username,password]
//             }, function (error, results, fields) {
//                 if (err) throw err;
//                 console.log("1 record inserted");
//             });
//     });
// res.send("Good")
// })




