
const express = require('express');
const router = express.Router();

const {postAnswer,viewAnswer} =require('../controller/answerController')

// 1. Post an answer to a question
router.post('/post-answer', postAnswer);

// 2. Get answers for a specific question
router.get('/:question_id', viewAnswer);

module.exports = router;
