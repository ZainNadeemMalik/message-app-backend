const express = require("express");
const { signUp } = require('../controllers/signUpController')
const { validateSignUp } = require('../middleware/validateUserInput')

const signUpRouter = express.Router()

signUpRouter.post('/', validateSignUp, signUp)

module.exports = signUpRouter