
const express = require('express');
const { getUserController, updateBalanceController } = require('../controller/user');
const { userChecker } = require('../middlewares/tokenVerofication');

const router = express.Router()
router.get('/get-user-data',userChecker,getUserController)
router.post('/update-balance-data',userChecker,updateBalanceController)
module.exports=router