const express = require('express')
const userController = require('../controllers/userController')
const { authenticateToken } = require('../middlewares/auth')
const { authenticate } = require('passport')

const router = express.Router()

router
.route('/:id')
.get(authenticateToken, userController.getUserById )
.patch( authenticateToken, userController.updateUserById)
.delete( authenticateToken, userController.deactivateUserById)

module.exports = router