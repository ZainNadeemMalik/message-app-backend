const express = require('express')
const sendUsers = require('../controllers/userController')
const userRouter = express.Router()

userRouter.get('/', sendUsers)

module.exports = userRouter