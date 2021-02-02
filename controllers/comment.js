const { Comment, Post, User } = require("../models");

/* Presentational */
const newComment = (req, res) => {
  res.render("comment/new");
};

module.exports = {
  newComment,
  //   createComment,
};
