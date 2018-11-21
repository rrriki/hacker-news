const express = require('express');
const { index, deletePost } = require('../controllers/postsController');
const router = express.Router();

/* GET all Posts */
router.get('/', index);

/* DELETE a Post */
router.delete('/:id', deletePost);

module.exports = router;
