const express = require("express");
const login = require('../controllers/loginController')
const { validateLogin } = require('../middleware/validateUserInput')

const loginRouter = express.Router()

loginRouter.post('/', validateLogin, login)

module.exports = loginRouter