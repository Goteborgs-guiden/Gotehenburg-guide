const mysql = require("mysql2");
var con = mysql.createConnection({
    host: "localhost",
    user: "developer",
    password: "password",
    database: "gbgmysql"
  });


function createtable(){
    //we should make all tables here!
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE abcquestion (question VARCHAR(255), alternatives VARCHAR(255), correct VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) console.warn("abc table exists");
            else{
                console.log("Table created");
            }
        });
    });
}



function createtableForRegiseter(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var tableForRegister = "CREATE TABLE account (username VARCHAR(255) NOT NULL , password VARCHAR(255) NOT NULL, token VARCHAR(255) NOT NULL) ";
        con.query(tableForRegister, function (err, result) {
            if (err) console.warn("table exists");
            else{
                console.log("Table created");
            }
        });
    });
}

  module.exports = {con, createtable, createtableForRegiseter};