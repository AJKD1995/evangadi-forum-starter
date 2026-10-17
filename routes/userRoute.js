const express =require('express');
const router = express.Router()
//authonthcation middleware
const authMiddleware = require('../middleware/authMiddleware')

//user controllers
const {register , login , checkuser} = require('../controller/userController')



//register route
router.post('/register', register);

//login user route
router.post('/login',login);

//check user route
router.get('/check',authMiddleware, checkuser);

module.exports = router