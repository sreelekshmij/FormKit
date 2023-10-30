const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/signup', authController.createUser)
router.post('/verify',authController.verifyUser)
router.post('/login',authController.loginUser)
router.post('/forget-pwd',authController.forgetPass)
router.post('/reset-pwd', authController.resetPass)

module.exports = router;