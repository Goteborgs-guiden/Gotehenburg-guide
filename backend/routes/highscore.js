require("dotenv").config();
const express = require("express");
const database = require("../sql");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { hashPassword } = require("mysql/lib/protocol/Auth");
const { use } = require("./register");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {authenticateToken}=require('./register')
router.use(cors());
module.exports=router;
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/",authenticateToken,(req,res) => {
    const body = req.body
    sql = "SELECT * FROM account WHERE username = '" + req.user.name + "'";
    database.con.query(sql, (err, result) => {
        if(err) console.warn("error getting the data");
        let a = parseInt(result[0]?.highscore,10)
        let b = parseInt(body.score,10)
        if(a < b){
            let sql2 = "UPDATE account SET highscore = " + body.score + " WHERE username = '" + req.user.name + "'";
            database.con.query(sql2, (err, result) => {
                if(err) console.warn("error getting the data");
                res.status(200).send("highscore updated");
            })
        }
        else{
            res.status(200).send("highscore not updated");
        }
    })
})