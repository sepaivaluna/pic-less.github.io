const { Comment, Post, User } = require("../models");

/* Presentational */
// const newComment = (req, res) => {
//   const id = req.params.postId;
//   Post.findById(id, (err, foundPost) => {
//     if (err) return console.log(err);

//     const context = {
//       user: req.user,
//       post: foundPost,
//     };

//     console.log(foundPost)
//     res.render("comment/new", context);
//   });
// };
const newComment = (req, res) => {
  Post.find({}).populate('comments').exec((err, allPosts) => {
    if (err) return console.log(err);

    const context = {
      user: req.user,
      post: allPosts,
    }
    console.log(allPosts)
    res.render('comment/new', context);
  });
};

const createComment = (req, res) => {

  Post.findById(req.params.postId, (err, foundPost) => {
    if (err) return console.log(err);
    Comment.create(req.body, (err, createdComment) => {

      foundPost.comments.push(createdComment._id);
      foundPost.save();

      res.redirect(`/${foundPost._id}/comments`);
    });
  });

};

module.exports = {
  newComment,
  createComment,
};
