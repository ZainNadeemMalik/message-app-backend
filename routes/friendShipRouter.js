const express = require('express')
const friendShipRouter = express.Router()
const { createFriendship } = require('../controllers/friendShipController')

friendShipRouter.post('/', createFriendship)

module.exports = friendShipRouter