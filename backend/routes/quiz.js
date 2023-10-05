const express=require('express')
const router=express.Router()
const mysql = require("mysql2")
const bodyParser = require('body-parser')
const database = require("../sql")

module.exports=router;
//http endpoints
router.use(bodyParser.json())
router.post("/abcanswer",(request,response, next) =>{
    const body = request.body;
    //todo William löser det
    response.send("ok")
})
router.get("/abcquestion/:id", (request, response, next) => {
    let id = request.params.id;
    let sql = 'SELECT * FROM abcquestion WHERE id = '+id;
    database.con.query(sql,(err, result) => {
        if(err) console.warn("error getting the data");
        response.send
        if(result[0]?.question){
            const data = result[0]
            delete data.correct;
            response.json(data)
        }
        else{
            response.status(404).send("site not found")
        }
    });   
});