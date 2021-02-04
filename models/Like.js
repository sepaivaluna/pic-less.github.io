const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }]
})

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
