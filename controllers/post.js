const { Post, User } = require("../models");
const user = require("./user");

/* Presentational */
const newPost = (req, res) => {
  const id = req.params.userId;
  User.findById(id, (err, foundUser) => {
    if (err) return console.log(err);
    console.log(foundUser);

    const context = {
      user: req.user,
    };
    res.render("post/new", context);
  });
};

const createPost = (req, res) => {
  const id = req.params.userId;
  Post.create(req.body, (err, createdPost) => {
    if (err) return console.log(err);
    User.findById(id, (err, foundUser) => {
      createdPost.user = foundUser._id;
      createdPost.save();

      foundUser.posts.push(createdPost._id);
      foundUser.save();

      res.redirect("/home");
      console.log(foundUser);
    });
  });
};

module.exports = {
  newPost,
  createPost,
};
