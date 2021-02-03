const { Comment, Post, User } = require("../models");

/* Presentational */
const newComment = (req, res) => {
  Post.findById(req.params.postId, (err) => {
    if (err) return console.log(err);
  })
    .populate({
      path: 'comments',
      populate : {
        path: 'user',
      }
    })
    .exec((err, thisPost) => {
      if (err) return console.log(err);

      const context = {
        user: req.user,
        post: thisPost,
      };
      console.log("This is what i get from populating comments on a post", thisPost);
      res.render("comment/new", context);
    });
};

const createComment = (req, res) => {
  User.findById(req.user._id, (err, foundUser) => {
    Post.findById(req.params.postId, (err, foundPost) => {
      Comment.create({
        content: req.body.content,
        user: foundUser,
      },
      (err, createdComment) => {
        foundPost.comments.push(createdComment._id);
        foundPost.save();

        res.redirect(`/${foundPost._id}/comments`);
        console.log("This is what i get from saving the comments into the post", foundPost);
      })
    })
  })
};

const deleteComment = (req, res) => {
  User.findById(req.params.userId, (err, foundUser) => {
    Post.findById(req.params.postId, (err, foundPost) => {
      Comment.findByIdAndDelete(req.params.commentId, (err, deletedComment) => {
        if (err) console.log(err)

        console.log("deleted the following comment: ", deletedComment);
        res.redirect(`/${foundPost._id}/comments`);
      })
    })
  })
}

module.exports = {
  newComment,
  createComment,
  deleteComment,
};
