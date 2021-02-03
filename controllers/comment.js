const { Comment, Post, User } = require("../models");

/* Presentational */

const newComment = (req, res) => {
  Post.findById(req.params.postId, (err) => {
    if (err) return console.log(err);
  })
    .populate("comments")
    .exec((err, thisPost) => {
      if (err) return console.log(err);

      const context = {
        user: req.user,
        post: thisPost,
      };
      console.log(thisPost);
      res.render("comment/new", context);
    });
};

const createComment = (req, res) => {
  Post.findById(req.params.postId, (err, foundPost) => {
    Comment.create(
      {
        content: req.body.content,
        user: req.user,
      },
      (err, createdComment) => {
        foundPost.comments.push(createdComment._id);
        foundPost.save();

        res.redirect(`/${foundPost._id}/comments`);
        console.log(foundPost);
      }
    );
  });
};

module.exports = {
  newComment,
  createComment,
};
