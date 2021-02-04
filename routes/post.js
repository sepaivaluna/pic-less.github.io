const router = require('express').Router();
const { post } = require('../controllers')

router.get('/:userId/new-post', post.newPost);
router.post('/:userId/add-post', post.createPost);

router.post('/:userId/:postId/new-like', post.addLike);

router.delete('/:userId/:postId/delete', post.deletePost);

module.exports = router;