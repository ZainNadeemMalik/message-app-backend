const express = require('express')
const { sendUserMessages } = require('../controllers/chatController')
const messageRouter = express.Router()

messageRouter.get('/:userId/:friendId', sendUserMessages)

module.exports = messageRouter