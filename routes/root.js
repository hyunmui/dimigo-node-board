const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

router.get('/', postController.index);

module.exports = router;
