const e = require("express");
const { Comment, User, Post } = require("../models");

/* This will populate all of the users and show their pictures w/ captions on the homepage */
const showHome = (req, res) => {
  User.find({})
    .populate("posts")
    .exec((err, users) => {
      if (err) return console.log(err);

      const context = {
        users,
        user: req.user,
      };
      console.log("This is what i get with users:" ,users);
      res.render("home/index", context);
    });
    console.log("This is what i get with req.user:", req.user);
};

module.exports = {
  show: showHome,
};
