const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");

const port = 3000;

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const articleShema = new mongoose.Schema({
    title : String,
    content : String
  });

const Article = mongoose.model("article", articleShema );

app.get('/articles',(req,res)=>{

    Article.find(function(err,findArticle){
        if(err){
            console.log('may error dito');
        }
        else{
            res.send(findArticle);
        }
    });
});

app.post('/articles',(req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    console.log(title + content);
    
    const newArticle = new Article({
        title : title,
        content : content
    });

    newArticle.save(function(err){
        if(!err){
            console.log('successfully created new article');
        }
        else{
            res.send(err);
        }
    });
    res.redirect('/articles');
});

app.delete("/articles",(req,res)=>{
    Article.deleteMany(function(err){
        if(!err){
            res.send('deleted successfully');
        }
        else{
            res.send(err);
        }
    });
});

app.listen(port,function(){
    console.log("the server started at port : " + port );
});