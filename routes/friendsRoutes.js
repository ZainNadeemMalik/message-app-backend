const express = require('express')
const { fetchUserFriends } = require('../controllers/friendsController')
const friendsRouter = express.Router()

friendsRouter.get('/:id', fetchUserFriends)

module.exports = friendsRouter