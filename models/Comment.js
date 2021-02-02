const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  content: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
