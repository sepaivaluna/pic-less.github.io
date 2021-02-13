const { Post } = require("../models");

/* This will populate all of the posts and show their pictures w/ captions on the homepage */

const showHome = (req, res) => {
  Post.find({})
    .populate("user")
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      if (err) return console.log(err);

      const context = {
        posts,
        user: req.user,
      };
      res.render("home/index", context);
      console.log("this is posts", posts);
      console.log("this is req.user", req.user);
    });
};

module.exports = {
  show: showHome,
};
