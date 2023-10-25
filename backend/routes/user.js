require("dotenv").config();
const express = require("express");
const database = require("../sql");
const router = express.Router();
const cors = require("cors");
const {authenticateToken}=require('./register')
router.use(cors());
module.exports=router;
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", authenticateToken, (req, res) => {
    sql = "SELECT username, first_name, surname, img, district, date_of_birth, friends, about, ABCHS, BlankHS, LocationHS FROM account WHERE username = '" + req.user.name + "'";
    database.con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result[0]);
    });
  });