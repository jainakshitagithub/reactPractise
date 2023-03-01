const express = require('express');
const bodyParser = require('body-parser');


app.get('/', function(req,res){
    res.send("Hello world");
})

app.listen('3000' , function(){
    console.log("Server listening at port 3000");
})

const app = express();
