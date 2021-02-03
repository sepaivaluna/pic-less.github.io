const router = require("express").Router();
const { comment } = require("../controllers");

router.get("/:postId/comments", comment.newComment);
router.post("/:userId/:postId/add-comment", comment.createComment);
router.delete('/:userId/:postId/:commentId/delete', comment.deleteComment);

module.exports = router;
