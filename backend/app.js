const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "developer",
    password: "password",
    database: "gbgmysql"
  });
  

function createtable(){
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!"); 
      var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
      con.query(sql, function (err, result) {
      if (err) console.warn("table exists");
      else{
        console.log("Table created");
      }
    });
    });
  }
  createtable();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
});