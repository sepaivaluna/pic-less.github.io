const { Post, User, Like } = require("../models");
const user = require("./user");

/* Presentational */
const newPost = (req, res) => {
  const id = req.params.userId;
  User.findById(id, (err, foundUser) => {
    if (err) return console.log(err);
    console.log(foundUser);

    const context = {
      user: req.user,
    };
    res.render("post/new", context);
  });
};

const createPost = (req, res) => {
  const id = req.params.userId;
  User.findById(id, (err, foundUser) => {
    if (err) return console.log(err);
    Post.create(req.body, (err, createdPost) => {
      createdPost.user = foundUser._id;
      createdPost.save();

      foundUser.posts.push(createdPost._id);
      foundUser.save();

      res.redirect("/home");
      console.log(foundUser);
    });
  });
};

const deletePost = (req, res) => {
  User.findById(req.params.userId, (err) => {
    Post.findByIdAndDelete(req.params.postId, (err, deletedPost) => {
      if (err) return console.log(err);

      console.log('deleted the following post: ', deletedPost)
      res.redirect('/home')
    })
  })
}

const addLike = (req, res) => {
  User.findById(req.params.userId, (err, foundUser) => {
    if (err) return console.log(err);
    Post.findById(req.params.postId, (err, foundPost) => {
      Like.create({
        posts: foundPost._id,
        user: foundUser._id,
      },
      (err, createdLike) => {
        foundPost.likes.push(createdLike._id);
        foundPost.save()

        foundUser.likes.push(createdLike._id);
        foundUser.save()

        res.redirect('/home')
        // console.log("this is the user that made a like", foundUser);
        console.log("this is the post that was liked:", foundPost);
        // console.log("this is the like that was created:", createdLike)
      })
    })
  })
}

module.exports = {
  newPost,
  createPost,
  deletePost,
  addLike,
};
