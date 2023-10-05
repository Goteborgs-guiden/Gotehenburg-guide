const mysql = require("mysql2");
var con = mysql.createConnection({
    host: "localhost",
    user: "developer",
    password: "password",
    database: "gbgmysql"
  });

  module.exports = {con};