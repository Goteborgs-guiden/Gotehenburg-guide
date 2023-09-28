const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

const port = 3000;


app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
});