const mysql = require("mysql2");
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
        var sql = "CREATE TABLE abcquestion (id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), alternatives VARCHAR(255), correct VARCHAR(255), img VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) console.warn("abc table exists");
            else{
                console.log("Table created");
            }
        });
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE fillBlank (id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), correct VARCHAR(255), img VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) console.warn("fillblank table exists");
            else{
                console.log("Table created");
            }
        });
    });
}

function createtableForRegiseter(){
    con.connect(function(err) {
        if (err) throw err;
        var tableForRegister = "CREATE TABLE account (username VARCHAR(255) NOT NULL , password VARCHAR(255) NOT NULL, token VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL , surname VARCHAR(255) NOT NULL , img VARCHAR(255), district VARCHAR(255) NOT NULL , date_of_birth VARCHAR(255) NOT NULL , highscore INT DEFAULT 0);";
        con.query(tableForRegister, function (err, result) {
            if (err) console.warn("register table exists");
            else{
                console.log("Table created");
            }
        });
    });
}

  module.exports = {con, createtable, createtableForRegiseter};