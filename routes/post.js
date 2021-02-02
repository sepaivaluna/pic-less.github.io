const router = require('express').Router();
const { post } = require('../controllers')

router.get('/:userId/new-post', post.newPost);
router.post('/:userId/add-post', post.createPost);

module.exports = router;