const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    img: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    caption: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
