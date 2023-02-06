//this file provides routes for all auth method whete login and create user controller called. 
const express = require('express')
const { createUserController, loginController,test  } = require('../controller/auth')
const { userChecker } = require('../middlewares/tokenVerofication')

const router = express.Router()
router.post('/login',loginController)
router.post('/create-user',createUserController)
router.get('/test',userChecker,test)
module.exports = router