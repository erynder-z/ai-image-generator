const express = require('express');
const generateImage_post = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateimage', generateImage_post);

module.exports = router;
