
const express=require('express')
const router=express.Router()
const mysql = require("mysql2")
const bodyParser = require('body-parser')
const database = require("../sql")
const cors = require('cors');

router.use(cors());
module.exports=router;
//http endpoints
router.use(bodyParser.json())
router.get("/abcanswer/:id",(request,response) =>{
    
    let id = request.params.id;
    let sql = 'SELECT * FROM abcquestion WHERE id = '+id;
    database.con.query(sql,(err, result) => {
        if(err) console.warn("error getting the data");
        console.log(result[0].correct)
        if(result[0]?.question){
           response.status(200).send(result[0].correct);  
        }
        else{
            response.status(404).send("site not found")
        }
    });
})
router.get("/abcquestion/:id", (request, response, next) => {
    let id = request.params.id;
    let sql = 'SELECT * FROM abcquestion WHERE id = '+id;
    database.con.query(sql,(err, result) => {
        if(err) console.warn("error getting the data");
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
router.get("/fillblankanswer/:id",(request,response) =>{
    
    let id = request.params.id;
    let sql = 'SELECT * FROM fillBlank WHERE id = '+id;
    database.con.query(sql,(err, result) => {
        if(err) console.warn("error getting the data");
        console.log(result[0].correct)
        if(result[0]?.question){
           response.status(200).send(result[0].correct);  
        }
        else{
            response.status(404).send("site not found")
        }
    });
})
router.get("/fillblank/:id", (request, response, next) => {
    let id = request.params.id;
    let sql = 'SELECT * FROM fillBlank WHERE id = '+id;
    database.con.query(sql,(err, result) => {
        console.log(result)
        if(err) console.warn("error getting the data");
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
router.get("/locationQuestion/:id", (request, response, next) => {
    let id = request.params.id;
    let sql = 'SELECT * FROM locationQuiz WHERE id = '+id;
    database.con.query(sql,(err, result) => {
        if(err) console.warn("error getting the data");
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
router.get("/locationAnswer/:id",(request,response) =>{
    let id = request.params.id;
    let sql = 'SELECT * FROM locationQuiz WHERE id = '+id;
    database.con.query(sql,(err, result) => {
        if(err) console.warn("error getting the data");
        console.log(result[0].correct)
        if(result[0]?.question){
           response.status(200).send(result[0].correct);  
        }
        else{
            response.status(404).send("site not found")
        }
    });
}) 
