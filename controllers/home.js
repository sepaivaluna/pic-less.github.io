const { Comment, User, Post } = require("../models");

const showHome = (req, res) => {
  Post.find({})
    .populate("user")
    .exec((err, posts) => {
      if (err) return console.log(err);

      const context = {
        posts,
        user: req.user,
      };
      res.render("home/index", context);
    });
};

module.exports = {
  show: showHome,
};
