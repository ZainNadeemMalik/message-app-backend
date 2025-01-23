const express = require('express')
const { verifyRefreshToken } = require('../middleware/verifyToken')
const newAccessToken = require('../controllers/tokenController')

const tokenRouter = express.Router()

tokenRouter.post('/', verifyRefreshToken, newAccessToken)

module.exports = tokenRouter