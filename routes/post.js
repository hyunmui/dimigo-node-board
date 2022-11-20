const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

router.route('/posts').get(postController.index);
router.route('/post/new').get(postController.new).post(postController.save);
router.route('/post/delete').post(postController.delete);

// request url params
router.route('/post/edit/:id').get(postController.edit).post(postController.save);
router.route('/post/:id').get(postController.view);

module.exports = router;
