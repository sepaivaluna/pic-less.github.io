const { User, Post } = require("../models");

const showHome = (req, res) => {
  Post.find({})
    .populate("user")
    .exec((err, posts) => {
      console.log(posts);
    });

  const context = {
    user: req.session.currentUser,
  };
  res.render("home/index", context);
};

module.exports = {
  show: showHome,
};
