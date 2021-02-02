const router = require("express").Router();
const { comment } = require("../controllers");

router.get("/:postId/comments", comment.newComment);
// router.post("/:postId/add-comment", comment.createComment);

module.exports = router;
