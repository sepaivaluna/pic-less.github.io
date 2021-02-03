const { User } = require("../models");
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
    console.log(foundAUser);

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

      res.render("home/index", { user: foundAUser });
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

    console.log("Found user");

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

          console.log(createdAUser);

          res.redirect("/user/login");
        });
      });
    });
  });
};

/* Presentational */
const showProfile = (req, res) => {
  console.log(req.user);
  const id = req.params.userId;
  User.findById(id, (err, foundUser) => {
    if (err) return console.log(err);

    const context = {
      user: req.user,
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
