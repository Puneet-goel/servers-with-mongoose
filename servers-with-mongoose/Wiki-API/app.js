const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongoose connection
mongoose.connect("mongodb://localhost:27017/wikiDB", {useUnifiedTopology: true, useNewUrlParser : true});

//database schema
const articleSchema = {
  title : String,
  content : String
};

const Article = mongoose.model("Article",articleSchema);


app.route("/articles")
//get request == read from a database
.get(function(req,res){
	Article.find(function(err,foundArticles){
		if(!err){
			console.log(foundArticles);
		    res.send(foundArticles);
		}
		else{
			res.send(err);
		}
	});
})

//delete request == delete from a database
.delete(function(req,res){
	Article.deleteMany(function(err){
		if(!err){
			res.send("Successfully deleted all artciles");
		}
		else{
			res.send(err);
		}
	});
})

//post request == create from a database
//request coming from postman
.post(function(req,res){
	console.log(req.body.title);
	const newArticle = new Article({
		title: req.body.title,
		content: req.body.content
	});

	newArticle.save(function(err){
		if(!err){
			res.send("Successfully added a new artcile");
		}
		else{
			res.send(err);
		}
	});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});