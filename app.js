const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "My first blog using ejs, node.js and express! You can add new post, you can click \"read more\", unfortunately this website dosen't have database so if server resets all posts will disappear";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
// const posts = [{title: null, description: null}];
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { content: homeStartingContent, posts: posts });
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
  const requestLink = _.lowerCase(req.params.postTitle);
  // console.log(posts);
  // if (posts.some(post => _.lowerCase(post.title) === requestLink)) {
    posts.forEach(post => {
      const postLink = _.lowerCase(post.title);
      if (requestLink === postLink) {
        // console.log("Match found!");
        // console.log(post);
        res.render("post", { post: post });
        // res.render("post");

      }
    });
    if (posts.some(post => _.lowerCase(post.title) != requestLink)) {
      res.render("404");
    }
  // }
  // else {
  //   console.log("ERROR 404 Not found! " + req.params.postTitle);
  //   res.render("404");
  // }
})


app.post("/edit", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
  // if(posts[0].title===null) posts.shift();
  posts.push(post);
  res.redirect("/");
})









app.use(function(req, res) {
  res.status(404).render('404');
});

app.listen(2137, function() {
  console.log("Server started on port 2137");
});
