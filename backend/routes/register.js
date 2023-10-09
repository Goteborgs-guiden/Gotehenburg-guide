const express = require('express')
const database = require('../sql')
const router = express.Router()
const bcrypt = require('bcryptjs');
const {hashPassword} = require("mysql/lib/protocol/Auth");
module.exports=router;

router.use(express.json())
router.use(express.urlencoded({extended: true}));




router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.genSalt(10, function (err, Salt){
        bcrypt.hash(password, Salt, function (err, hash){
            if (err) {
                return console.log('Cannot encrypt');
            }
            const hashedPassword = hash;
            console.log(hash);
            bcrypt.compare(password, hashedPassword, async function (err, isMatch){
                if (isMatch){
                    console.log('Encrypted password is: ', password);
                    console.log('Decrypted password is: ', hashedPassword);
                }
                if (!isMatch){
                    console.log(hashedPassword+ 'is not encryption of'+ password);
                }

                var rand = function() {
                    return Math.random().toString(36).substring(2);
                };

                var token = function() {
                    return rand() + rand();
                };

                token();

                database.con.connect(function (err) {
                    if (err) throw err;
                    console.log("Connected!");
                    var sql = "INSERT INTO account (username, password, token) VALUES ";
                    database.con.query({
                        sql: 'INSERT INTO account (username, password, token) VALUES (?, ?, ?)',
                        values: [username, hashedPassword, token()]
                    }, function (error, results, fields) {
                        if (err) throw err;
                        console.log("1 record inserted");
                    });
                });
                res.send("Good")
            })
        })
    })
})



