
const express = require('express');
const router = express.Router();



//questions controllers
const {allQuestions, postQuestions ,questionId} = require('../controller/questionController')


// 1. Get all questions for the home page
router.get('/all-questions',allQuestions);

// 2. Post a new question
router.post('/post-questions', postQuestions);

// 3. Get a single question by question ID
router.get('/:questionid', questionId);

module.exports = router;
