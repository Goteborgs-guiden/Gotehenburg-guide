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
router.post("/", authenticateToken, (req, res) => {
    if(req.body.first_name !== undefined){
        sql = "UPDATE account SET first_name = '" + req.body.first_name + "' WHERE username = '" + req.user.name + "'";
        database.con.query(sql, (err, result) => {
        })
    }
    if(req.body.surname !== undefined){
        sql = "UPDATE account SET surname = '" + req.body.surname + "' WHERE username = '" + req.user.name + "'";
        database.con.query(sql, (err, result) => {
        })
    }
    if(req.body.img !== undefined){
        sql = "UPDATE account SET img = '" + req.body.img + "' WHERE username = '" + req.user.name + "'";
        database.con.query(sql, (err, result) => {
        })
    }
    if(req.body.district !== undefined){
        sql = "UPDATE account SET district = '" + req.body.district + "' WHERE username = '" + req.user.name + "'";
        database.con.query(sql, (err, result) => {
        })
    }
    if(req.body.date_of_birth !== undefined){
        sql = "UPDATE account SET date_of_birth = '" + req.body.date_of_birth + "' WHERE username = '" + req.user.name + "'";
        database.con.query(sql, (err, result) => {
        })
    }
    if(req.body.about !== undefined){
        sql = "UPDATE account SET about = '" + req.body.about + "' WHERE username = '" + req.user.name + "'";
        database.con.query(sql, (err, result) => {
        })
    }
    res.status(200).send("Profile updated");
});
router.post("/friend", authenticateToken, (req, res) => {
    sql = "SELECT friends FROM account WHERE username = '" + req.user.name + "'";
    database.con.query(sql, (err, result) => {
        let friends = result[0].friends;
        if(friends === ""){
            friends = req.body.friend;
        }
        else{
            friends = friends + "," + req.body.friend;
        }
        sql = "UPDATE account SET friends = '" + friends + "' WHERE username = '" + req.user.name + "'";
        database.con.query(sql, (err, result) => {
            res.status(200).send("Friend added");
        })
    })
})