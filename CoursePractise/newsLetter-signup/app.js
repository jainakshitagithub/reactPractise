const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.sendFile(__dirname +"/signup.html");
})

app.post('/' , function(req,res){
 var fName = req.body.fName;
 var lName = req.body.lName;
 var email = req.body.email;

 console.log(fName , lName , email);
})

app.listen('3000' , function(){
    console.log("Server listening at port 3000");
})


//Api key
// 204d18d3ba638030ed89cddd23279282-us17
