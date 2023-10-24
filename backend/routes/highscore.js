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

router.post("/abc",authenticateToken,(req,res) => {
    const body = req.body
    sql = "SELECT * FROM account WHERE username = '" + req.user.name + "'";
    database.con.query(sql, (err, result) => {
        if(err) console.warn("error getting the data");
        let a = parseInt(result[0]?.ABCHS,10)
        let b = parseInt(body.score,10)
        if(a < b){
            let sql2 = "UPDATE account SET ABCHS = " + body.score + " WHERE username = '" + req.user.name + "'";
            database.con.query(sql2, (err, result) => {
                if(err) console.warn("error getting the data");
                res.status(200).send("ABCHS updated");
            })
        }
        else{
            res.status(200).send("ABCHS not updated");
        }
    })
})
router.get("/abc", (req, res) => {
    let sql = "SELECT username, ABCHS FROM account ORDER BY ABCHS DESC LIMIT 11";
    database.con.query(sql, (err, result) => {
        if(err) console.warn("error getting the data");
        res.status(200).send(result);
    })
})
router.post("/blank",authenticateToken,(req,res) => {
    const body = req.body
    sql = "SELECT * FROM account WHERE username = '" + req.user.name + "'";
    database.con.query(sql, (err, result) => {
        if(err) console.warn("error getting the data");
        let a = parseInt(result[0]?.BlankHS,10)
        let b = parseInt(body.score,10)
        if(a < b){
            let sql2 = "UPDATE account SET BlankHS = " + body.score + " WHERE username = '" + req.user.name + "'";
            database.con.query(sql2, (err, result) => {
                if(err) console.warn("error getting the data");
                res.status(200).send("BlankHS updated");
            })
        }
        else{
            res.status(200).send("BlankHS not updated");
        }
    })
})
router.get("/blank", (req, res) => {
    let sql = "SELECT username, BlankHS FROM account ORDER BY BlankHS DESC LIMIT 11";
    database.con.query(sql, (err, result) => {
        if(err) console.warn("error getting the data");
        res.status(200).send(result);
    })
})
router.post("/location",authenticateToken,(req,res) => {
    const body = req.body
    sql = "SELECT * FROM account WHERE username = '" + req.user.name + "'";
    database.con.query(sql, (err, result) => {
        if(err) console.warn("error getting the data");
        let a = parseInt(result[0]?.LocationHS,10)
        let b = parseInt(body.score,10)
        if(a < b){
            let sql2 = "UPDATE account SET LocationHS = " + body.score + " WHERE username = '" + req.user.name + "'";
            database.con.query(sql2, (err, result) => {
                if(err) console.warn("error getting the data");
                res.status(200).send("LocationHS updated");
            })
        }
        else{
            res.status(200).send("LocationHS not updated");
        }
    })
})
router.get("/location", (req, res) => {
    let sql = "SELECT username, LocationHS FROM account ORDER BY LocationHS DESC LIMIT 11";
    database.con.query(sql, (err, result) => {
        if(err) console.warn("error getting the data");
        res.status(200).send(result);
    })
})