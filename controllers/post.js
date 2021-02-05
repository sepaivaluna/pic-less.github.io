const { Post, User, Like } = require("../models");
const user = require("./user");

/* Presentational */
const newPost = (req, res) => {
  const id = req.params.userId;
  User.findById(id, (err, foundUser) => {
    if (err) return console.log(err);

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
    });
  });
};

const deletePost = (req, res) => {
  User.findById(req.params.userId, (err) => {
    Post.findByIdAndDelete(req.params.postId, (err, deletedPost) => {
      if (err) return console.log(err);

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
      })
    })
  })
}

// const deleteLike = (req, res) => {
//   User.findById(req.params.userId, (err, foundUser) => {
//     if (err) return console.log(err);
//     Post.findById(req.params.postId, (err, foundPost) => {
//       Like.findByIdAndDelete(req.params.likeId, (err, deletedLike) => {
//         if (err) return console.log(err);

//         console.log('Deleted the following like: ', deletedLike);
//         res.redirect('/home');
//       })
//     })
//   })
// }

const deleteLike = (req, res) => {
  Post.findById(req.params.postId, (err, foundPost) => {
    if (err) return console.log(err);
    User.findById(req.params.userId, (err, foundUser) => {
      Like.findByIdAndDelete(req.params.likeId, (err, deletedLike) => {
        if (err) return console.log(err);

        console.log('Deleted the following like: ', deletedLike);
        res.redirect('/home');
      })
    })
  })
}

const showEdit = (req, res) => {

  Post.findById(req.params.postId, (err, foundPost) => {
    if(err) return console.log(err);
    const context = {
      user: req.user,
      post: foundPost,
    }
    res.render('post/edit', context);
  })
}

const editPost = (req, res) => {

  Post.findByIdAndUpdate(req.params.postId, 
    {$set: 
      {... req.body},
    },
    {
      new: true,
    },
    (err, updatePost) => {
      if (err) return console.log(err);

    res.redirect('/home');
  });
}

module.exports = {
  newPost,
  createPost,
  deletePost,
  addLike,
  showEdit,
  editPost,
  deleteLike,
};
