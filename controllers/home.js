const e = require("express");
const { Comment, User, Post } = require("../models");

// const showHome = (req, res) => {
//   Post.find({})
//     .populate("comments")
//     .exec((err, posts) => {
//       if (err) return console.log(err);

//       const context = {
//         posts,
//         user: req.user,
//       };
//       console.log(posts);
//       console.log(req.user);
//       // console.log(posts.comments);
//       res.render("home/index", context);
//     });
// };

const showHome = (req, res) => {
  User.find({})
    .populate("posts")
    .exec((err, users) => {
      if (err) return console.log(err);

      const context = {
        users,
        user: req.user,
      };
      console.log(users);
      res.render("home/index", context);
    });
    console.log(req.user, "user");
};

module.exports = {
  show: showHome,
};
