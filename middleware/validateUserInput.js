const { body } = require('express-validator')

const validateSignUp = [
  body('username')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Username must be between 1 to 10 characters long.'),

  body('password')
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage('Password must be between 4 to 10 characters long.')
]

const validateLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
]

module.exports = { validateSignUp, validateLogin }