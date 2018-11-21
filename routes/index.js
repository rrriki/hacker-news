const express = require('express');
const { index } = require('../controllers/postsController');

const router = express.Router();
/* GET home page. */
router.get('/', index);

module.exports = router;
