const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

const port = 3000;

<<<<<<< Updated upstream

=======
var con = mysql.createConnection({
    host: "localhost",
    user: "developer",
    password: "password",
    database: "gbgmysql"
  });
  

function createtable(){
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!"); 
      var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
      con.query(sql, function (err, result) {
      if (err) console.warn("table exists");
      else{
        console.log("Table created");
      }
    });
    });
  }
  createtable();  
>>>>>>> Stashed changes
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
});
let abcArray = [];
let abcDTO = [];
function createabcDTO(){
    for(let i = 0; i < abcArray.length; i++){
        abcDTO.push({
            id:abcArray[i].id,
            question:abcArray[i].question,
            a: abcArray[i].a,
            b: abcArray[i].b,
            c: abcArray[i].c
        })
    }
}
function createABCArray(){
    
    let sql = 'SELECT * FROM abcquestion';
    con.query(sql,(err, result) => {
        if(err) console.warn("error getting the data");
        for (let i = 0; i < result.length; i++) {
            let random = Math.floor(Math.random() * 3)
            //correct is a
            if(random === 0){
                abcArray.push({
                    id: result[i].id,
                    question: result[i].question,
                    a: result[i].correct,
                    b: result[i].wrong1,
                    c: result[i].wrong2,
                    correct: 'a'
                });
            }
            //correct is b
            if(random === 1){
                abcArray.push({
                    id: result[i].id,
                    question: result[i].question,
                    a: result[i].wrong1,
                    b: result[i].correct,
                    c: result[i].wrong2,
                    correct: 'b'
                });
            }
            //correct is c
            if(random === 2){
                abcArray.push({
                    id: result[i].id,
                    question: result[i].question,
                    a: result[i].wrong2,
                    b: result[i].wrong1,
                    c: result[i].correct,
                    correct: 'c'
                });
            }
        }
    })
}
createABCArray();
    setTimeout(() =>{
        createabcDTO();
    }, 100)




//http endpoints
app.get("/abcquestions", (request, response, next) => {
    response.send(JSON.stringify(abcDTO));
    
});
app.use(bodyParser.json())
app.post("/abcanswer",(request,response, next) =>{
    const body = request.body;
    if(abcArray[body.id].correct === body.answer){
        response.send(true);
    }
    else{
        response.send(false);
    }
    response.send("ok")
})
app.get("/abcquestion/:id", (request, response, next) => {
    let id = request.params.id;
    let sql = 'SELECT * FROM abcquestion WHERE id = '+id;
    con.query(sql,(err, result) => {
        if(err) console.warn("error getting the data");
        response.send(result);
    });
});