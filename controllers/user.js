const { User, Post, Like } = require("../models");
const bcrypt = require("bcrypt");

/* Presentational/Main */
const showLogin = (req, res) => {
  res.render("user/login", {
    user: req.user,
    title: "Log In",
    message: "",
  });
};

/* Functional */
const loginForm = (req, res) => {
  if (req.body.username === "" || req.body.password === "")
    return res.render("user/login", {
      user: req.user,
      title: "Log In",
      message: "Please fill out username and password",
    });

  User.findOne({ username: req.body.username }, (err, foundAUser) => {
    if (err)
      return res.render("user/login", {
        user: req.user,
        title: "Log In",
        message: "err finding user",
      });

    if (!foundAUser)
      return res.render("user/login", {
        user: req.user,
        title: "Log In",
        message: "err couldn't find a user",
      });

    bcrypt.compare(req.body.password, foundAUser.password, (err, match) => {
      if (err)
        return res.render("user/login", {
          user: req.user,
          title: "Log In",
          message: "err bcrypt compare",
        });

      if (!match)
        return res.render("user/login", {
          user: req.user,
          title: "Log In",
          message: "password invalid",
        });
      req.user = foundAUser;
      User.find({})
      .populate("posts")
      .exec((err, users) => {
        if (err) return console.log(err);
  
        const context = {
          users,
          user: foundAUser,
        };
        res.render("home/index", context);
      });
    });
  });
};

/* Presentational */
const showRegister = (req, res) => {
  res.render("user/register", {
    title: "Register",
    user: req.user,
    message: "",
  });
};

const newUserForm = (req, res) => {
  User.findOne({ email: req.body.email }, (err, foundAUser) => {
    if (err) return console.log(err);

    if (foundAUser)
      return res.render("user/register", {
        title: "Register",
        user: req.user,
        message: "This account already exists",
      });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log(err);

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);

        req.body.password = hash;

        User.create(req.body, (err, createdAUser) => {
          if (err) return console.log(err);

          res.redirect("/user/login");
        });
      });
    });
  });
};

const showProfile = (req, res) => {
  User.findById(req.params.userId, (err) => {
    if (err) return console.log(err);
  })
    .populate({
      path: "posts",
      populate: {
        path: "comments",
        populate: {
          path: 'user',
        }
      }
    }).populate({
      path: 'likes',
      populate: {
        path: "posts"
      }
    })
    .exec((err, users) => {
      if (err) return console.log(err);

      const context = {
        user: req.user,
        users,
        title: 'Profile'
      };

      res.render("user/profile", context);
    });
};


const logout = (req, res) => {
  res.render("user/logout");
};

module.exports = {
  showLogin,
  loginForm,
  showProfile,
  showRegister,
  newUserForm,
  logout,
};