const express = require('express')
const database = require('../sql')
const router = express.Router()
const bcrypt = require('bcryptjs');
const {hashPassword} = require("mysql/lib/protocol/Auth");
const { use } = require('./register');
module.exports=router;

router.use(express.json())
router.use(express.urlencoded({extended: true}));

router.post("/", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const surname = req.body.surname;
    const img = req.body.img;
    const district = req.body.district;
    const date_of_birth = req.body.date_of_birth;
    database.con.connect(function (err) {
        if (err) throw err;
        let sql1 = "SELECT username FROM account WHERE username = \'"+username+"\'";
        database.con.query(sql1,(err, result) => {
        if(err) console.warn("error getting the data");
            if(result[0]?.username){
                res.status(409).send("Username already exists")
            }
            else{
                bcrypt.genSalt(10, function (err, Salt){
                    bcrypt.hash(password, Salt, function (err, hash){
                        if (err) {
                            return console.log('Cannot encrypt');
                        }
                        const hashedPassword = hash;
                        console.log(hash);
                        bcrypt.compare(password, hashedPassword, async function (err, isMatch){
                            if (isMatch){
                                //console.log('Encrypted password is: ', password);
                                //console.log('Decrypted password is: ', hashedPassword);
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
                                var sql = "INSERT INTO account (username, password, token, first_name, surname, img, district, date_of_birth) VALUES ";
                                database.con.query({
                                    sql: 'INSERT INTO account (username, password, token, first_name, surname, img, district, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                                    values: [username, hashedPassword, token(), first_name, surname, img, district, date_of_birth]
                                }, function (error, results, fields) {
                                    if (err) throw err;
                                    console.log("1 record inserted");
                                });
                            });
                            res.send("Good")
                        })
                    })
                })
            }
        });
    }); 

    

    
    
})



