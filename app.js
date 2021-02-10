const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

const PostSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = new mongoose.model("post", PostSchema);

// const post = new Post({
//   title: "xD",
//   content: "Jakiś tam sobie post"
// });
// post.save();



const homeStartingContent = "My first blog using ejs, node.js and express! You can add new post, you can click \"read more\", unfortunately this website dosen't have database so if server resets all posts will disappear";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {

  Post.find(function(err, findposts) { //zwraca tablice
    if (!err) {
      res.render("home", { content: homeStartingContent, posts: findposts });
    }
  });


  // console.log(posts);
});
app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent });
});
app.get("/edit", (req, res) => {
  res.render("edit");
});


app.get("/posts/:postTitle", (req, res) => {
  const requestLink = req.params.postTitle;
  console.log(requestLink);

  Post.findOne({ _id: requestLink }, function(err, findPost) {
    if (!err) {
      console.log("git");
      if (requestLink == findPost._id) {
        console.log("gitówa x2");
        res.render("post", { post: findPost });
      } else console.log("nie git");
    } else console.log(err);
  });
  // if (posts.some(post => _.lowerCase(post.title) != requestLink)) {
  //   res.render("404");
  // }
  // }
  // else {
  //   console.log("ERROR 404 Not found! " + req.params.postTitle);
  //   res.render("404");
  // }
});


app.post("/edit", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save(function(err) {
    if (!err) res.redirect("/");
  });
  // if(posts[0].title===null) posts.shift();
  // posts.push(post);
  // res.redirect("/");
})









app.use(function(req, res) {
  res.status(404).render('404');
});

app.listen(process.env.PORT || 2137, function() {
  console.log("Server started on port 2137");
});
