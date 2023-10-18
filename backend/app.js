const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2")
const port = 3000;
const database = require("./sql")
const register = require('./routes/register')
const quiz=require('./routes/quiz')
app.use("/quiz", quiz)
app.use("/register", register)

app.listen(port, () => {
    database.createtable();
    database.createtableForRegiseter();
    console.log(`app listening on port ${port}`);
});
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
