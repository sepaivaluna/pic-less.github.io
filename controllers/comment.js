const { Comment, Post, User } = require("../models");

/* Presentational */
const newComment = (req, res) => {
  Post.findById(req.params.postId, (err) => {
    if (err) return console.log(err);
  })
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec((err, thisPost) => {
      if (err) return console.log(err);

      const context = {
        user: req.user,
        post: thisPost,
      };
      res.render("comment/new", context);
      console.log("console logging thisPost on show newComment fnt", thisPost);
      console.log(req.user);
    });
};

const createComment = (req, res) => {
  User.findById(req.user._id, (err, foundUser) => {
    Post.findById(req.params.postId, (err, foundPost) => {
      Comment.create(
        {
          content: req.body.content,
          user: foundUser,
        },
        (err, createdComment) => {
          foundPost.comments.push(createdComment._id);
          foundPost.save();

          foundUser.comments.push(createdComment._id);
          foundUser.save();

          res.redirect(`/${foundPost._id}/comments`);
        }
      );
    });
  });
};

const deleteComment = (req, res) => {
  User.findById(req.params.userId, (err, foundUser) => {
    Post.findById(req.params.postId, (err, foundPost) => {
      Comment.findByIdAndDelete(req.params.commentId, (err, deletedComment) => {
        if (err) return console.log(err);

        let idx = foundPost.comments.indexOf(deletedComment._id);
        let idx2 = foundUser.comments.indexOf(deletedComment._id);

        if (idx !== -1) foundPost.comments.splice(idx, 1);
        if (idx2 !== -1) foundUser.comments.splice(idx2, 1);

        foundPost.save();
        foundUser.save();

        res.redirect(`/${foundPost._id}/comments`);
      });
    });
  });
};

module.exports = {
  newComment,
  createComment,
  deleteComment,
};
