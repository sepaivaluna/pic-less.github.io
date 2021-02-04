const { Comment, User, Post } = require("../models");

/* This will populate all of the posts and show their pictures w/ captions on the homepage */

const showHome = (req, res) => {
  Post.find({}).populate('user').sort({createdAt: -1}).exec((err, posts) => {
    if (err) return console.log(err);

    const context = {
      posts,
      user: req.user,
    }
    console.log("this is what i get with posts[0].likes:", posts[0].likes);
    console.log("this is what i get with user:", req.user)
    res.render('home/index', context);
    // console.log("logging all of the req", req)
  })
}

module.exports = {
  show: showHome,
};
