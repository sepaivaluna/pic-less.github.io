const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      // require: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg",
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    googleId: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
