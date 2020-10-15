//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");



const homeStartingContent ="“Keeping a personal journal a daily in-depth analysis and evaluation of your experiences is a high-leverage activity that increases self-awareness and enhances all the endowments and the synergy among them.” — Stephen R.Covey.";
const aboutContent =
  "Daily Journal was created to help you optimize your creative potential.<Reasons to journal: accelerates your ability to manifest your goals , creates a springboard for daily recovery, generates clarity and congruence and clears your emotions 💻";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/journalDB",{useNewUrlParser:true});

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/about", function (req, res) {

  res.render("about", { 
    aboutContent: aboutContent
  });
});

app.get("/contact", function (req, res) {
  // res.render("contact", { contactContent: contactContent });
   res.render("compose");
});

app.get("/compose", function(req,res){
  res.render("compose");
});


app.post("/compose", function (req, res) {
   const post = new Post ({
    title: req.body.postTitle,
    content : req.body.postBody
   });

    post.save();

   res.redirect("/");
    post.save(function (err) {
      if (!err) {
        res.redirect("/");
      }
    });
});

app.get("/posts/:postId",function(req,res){
  // console.log(req.params.postName);
  const requestedPostId = req.params.postId;
 
   Post.findOne({_id: requestedPostId}, function(err, post){
    
    res.render("post", {
      title: post.title,
      content: post.content
    });
  
  });
});


app.listen(3001, function() {
  console.log(" 🌍Server started on port 3001");
});
