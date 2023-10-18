require("dotenv").config();
const express = require("express");
const database = require("../sql");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { hashPassword } = require("mysql/lib/protocol/Auth");
const { use } = require("./register");
const jwt = require("jsonwebtoken");
const cors = require("cors");
module.exports = { 
  router:router,
  authenticateToken:authenticateToken
}


router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());
router.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const surname = req.body.surname;
  const img = req.body.img;
  const district = req.body.district;
  const date_of_birth = req.body.date_of_birth;
  database.con.connect(function (err) {
    if (err) throw err;
    let sql1 =
      "SELECT username FROM account WHERE username = '" + username + "'";
    database.con.query(sql1, (err, result) => {
      if (err) console.warn("error getting the data");
      if (result[0]?.username) {
        res.status(409).send("Username already exists");
      } else {
        bcrypt.genSalt(10, function (err, Salt) {
          bcrypt.hash(password, Salt, function (err, hash) {
            if (err) {
              return console.log("Cannot encrypt");
            }
            const hashedPassword = hash;
            bcrypt.compare(
              password,
              hashedPassword,
              async function (err, isMatch) {
                if (err) {
                  res.status(500).send("Internal server error");
                }
                database.con.connect(function (err) {
                  if (err) throw err;
                  console.log("Connected!");
                  var sql =
                    "INSERT INTO account (username, password, token, first_name, surname, img, district, date_of_birth) VALUES ";
                  database.con.query(
                    {
                      sql: "INSERT INTO account (username, password, token, first_name, surname, img, district, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                      values: [
                        username,
                        hashedPassword,
                        '',
                        first_name,
                        surname,
                        img,
                        district,
                        date_of_birth,
                      ],
                    },
                    function (error, results, fields) {
                      if (err) throw err;
                      console.log("1 record inserted");
                    }
                  );
                });
                res.send("Good");
              }
            );
          });
        });
      }
    });
  });
});

router.post("/login", (req, res) => {
  username = req.body.username;
  password = req.body.password;
  database.con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM account WHERE username = '" + username + "'";
    database.con.query(sql, function (err, result) {
      if (err) throw err;
      if (result[0]?.username) {
        bcrypt.compare(password, result[0].password, function (err, isMatch) {
          if (isMatch) {
            const user = { name: username };
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(
              user,
              process.env.REFRESH_TOKEN_SECRET
            );
            var sql2 =
              "UPDATE account SET token = '" +
              refreshToken +
              "' WHERE username = '" +
              username +
              "'";
            database.con.query(sql2, function (err, result) {
              if (err) throw err;
              res.json({
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
            });
          } else {
            res.status(401).send("Wrong credentials");
          }
        });
      } else {
        res.status(401).send("Wrong credentials");
      }
    });
  });
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}
/*This endpoint is only for testing authenticateToken should be removed later*/
router.get("/userinfo", authenticateToken, (req, res) => {
  sql = "SELECT * FROM account WHERE username = '" + req.user.name + "'";
  database.con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result[0]);
  });
});
router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401);
  sql = "SELECT * FROM account WHERE token = '" + refreshToken + "'";
  database.con.query(sql, function (err, result) {
    if (err) console.log(err);
    if (result[0]?.token) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.status(403).send("could not verify");
          const accessToken = generateAccessToken({ name: result[0].username });
          res.json({ accessToken: accessToken });
        }
      );
    } else {
      res.status(403).send("token not found");
    }
  });
});
router.delete("/logout", (req, res) => {
  const refreshToken = req.body.token;
  let sql = "SELECT token FROM account WHERE token = '" + refreshToken + "'";
  database.con.query(sql, function (err, result) {
    if (err) throw err;
    if (result[0]?.token) {
      let sql =
        "UPDATE account SET token = 'none' WHERE token = '" +
        refreshToken +
        "'";
      database.con.query(sql, function (err, result) {
        if (err) throw err;
        res.sendStatus(204);
      });
    } else {
      res.sendStatus(403);
    }
  });
});
