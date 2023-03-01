const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine' , 'ejs');
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/wikiDB');


const articleSchema = {
    title : String,
    content : String,
}

const Article = mongoose.model('Article' , articleSchema)

app.route("/articles")
.get( function(req,res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }
        else{
            res.send(err);
        }
    })
})
.post(function(req,res){
    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    })

    newArticle.save(function(err){
        if(!err){
    res.send({
        message:"ok",
        status : 200
    })
        }
        else {
            res.send(err);
        }
    });
})
.delete( function(req,res){
    Article.deleteMany( function(err){
        if(!err){
            res.send({
                message: "Successfully Deleted all Articles",
                status: 200
            })
        }
        else{
            res.send(err);
        }
    })
})

app.route("/articles/:id")
.get(function(req,res){
    Article.findOne({_id : req.params.id} , function(err , foundArticle){
        if(foundArticle){
            res.send({
                data : foundArticle,
                message: "ok"
            })
        }
        else{
            res.send({
                message : "No Article found"
            })
        }
    })
})
.put(function(req,res){
    Article.updateOne({_id : req.params.id} , 
        {title : req.body.title , content : req.body.content} ,
        {overwrite : true}, 
        function(err){
        if(!err){
            res.send({
                message : "Successfully Updaded"
            })
        }
        else{
            res.send({
                message : err
            })
        }
    })
})
.patch(function(req,res){
    Article.updateOne({_id : req.params.id} , {$set : req.body} , function(err){
        if(!err){
            res.send({
                message : "Successfully Updaded"
            })
        }
        else{
            res.send({
                message : err
            })
        }
    })
})
.delete(function(req,res){
    Article.deleteOne({_id : req.params.id} , function(err){
        if(!err){
            res.send({
                message : "Successfully Deleted"
            })
        }
        else{
            res.send({
                message : err
            })
        }
    })
})



app.listen('3000' , function(){
    console.log('Server is listening to port 3000');
})