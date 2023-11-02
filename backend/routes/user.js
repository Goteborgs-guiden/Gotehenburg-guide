require("dotenv").config();
const express = require("express");
const database = require("../sql");
const router = express.Router();
const cors = require("cors");
const { authenticateToken } = require("./register");
router.use(cors());
module.exports = router;
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", authenticateToken, (req, res) => {
  sql =
    "SELECT username, first_name, surname, img, district, date_of_birth, friends, about, ABCHS, BlankHS, LocationHS FROM account WHERE username = '" +
    req.user.name +
    "'";
  database.con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result[0]);
  });
});
router.post("/", authenticateToken, (req, res) => {
  if (req.body.first_name !== undefined && req.body.first_name !== "") {
    sql =
      "UPDATE account SET first_name = '" +
      req.body.first_name +
      "' WHERE username = '" +
      req.user.name +
      "'";
    database.con.query(sql, (err, result) => {});
  }
  if (req.body.surname !== undefined && req.body.surname !== "") {
    sql =
      "UPDATE account SET surname = '" +
      req.body.surname +
      "' WHERE username = '" +
      req.user.name +
      "'";
    database.con.query(sql, (err, result) => {});
  }
  if (req.body.img !== undefined && req.body.img !== "") {
    sql =
      "UPDATE account SET img = '" +
      req.body.img +
      "' WHERE username = '" +
      req.user.name +
      "'";
    database.con.query(sql, (err, result) => {});
  }
  if (req.body.district !== undefined && req.body.district !== "") {
    sql =
      "UPDATE account SET district = '" +
      req.body.district +
      "' WHERE username = '" +
      req.user.name +
      "'";
    database.con.query(sql, (err, result) => {});
  }
  if (req.body.date_of_birth !== undefined && req.body.date_of_birth !== "") {
    sql =
      "UPDATE account SET date_of_birth = '" +
      req.body.date_of_birth +
      "' WHERE username = '" +
      req.user.name +
      "'";
    database.con.query(sql, (err, result) => {});
  }
  if (req.body.about !== undefined && req.body.about !== "") {
    sql =
      "UPDATE account SET about = '" +
      req.body.about +
      "' WHERE username = '" +
      req.user.name +
      "'";
    database.con.query(sql, (err, result) => {});
  }
  res.status(200).send("Profile updated");
});
router.post("/friend", authenticateToken, (req, res) => {
  sql =
    "SELECT username FROM account WHERE username = '" + req.body.friend + "'";
  database.con.query(sql, (err, result) => {
    console.log(result[0]?.username);
    if (result[0]?.username) {
      sql =
        "SELECT friends FROM account WHERE username = '" + req.user.name + "'";
      database.con.query(sql, (err, result) => {
        let friends = result[0].friends;
        if(friends.includes(req.body.friend)){
            res.status(404).send("Friend already added");
            return;
        }
        if (friends === "") {
          friends = req.body.friend;
        } else {
          friends = friends + "," + req.body.friend;
        }
        sql =
          "UPDATE account SET friends = '" +
          friends +
          "' WHERE username = '" +
          req.user.name +
          "'";
        database.con.query(sql, (err, result) => {
          res.status(200).send("Friend added");
        });
      });
    }
    else{
        res.status(404).send("User not found");
    }
  });
});
