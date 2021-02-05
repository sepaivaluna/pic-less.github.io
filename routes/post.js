const router = require('express').Router();
const { post } = require('../controllers')

router.get('/:userId/new-post', post.newPost);
router.post('/:userId/add-post', post.createPost);

router.post('/:userId/:postId/new-like', post.addLike);

router.get('/:postId/show-edit', post.showEdit);
router.put('/:postId/save-edit', post.editPost);

router.delete('/:postId/:userId/:likeId/delete-like', post.deleteLike);

router.delete('/:userId/:postId/delete', post.deletePost);

module.exports = router;