const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2")
const port = 3000;
const database = require("./sql")

const quiz=require('./routes/quiz')
app.use("/quiz",quiz)
function createtable(){
    //we should make all tables here!
    //denna borde vara i sql simon fixar!!!
    database.con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!"); 
      var sql = "CREATE TABLE abcquestion (id INT NOT NULL AUTO_INCREMENT, question VARCHAR(255), alternatives VARCHAR(255), correct VARCHAR(255), PRIMARY KEY (id))";
      database.con.query(sql, function (err, result) {
      if (err) console.warn("abc table exists");
      else{
        console.log("Table created");
      }
    });
    });
  }

app.listen(port,()=>{
    createtable();  
    console.log(`app listening on port ${port}`);
});
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
