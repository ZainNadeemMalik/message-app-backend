const express = require("express");

const chatRouter = express.Router()

chatRouter.post('/', async (req, res) => {
  const { content } =  req.body

  const newMessage = await prisma.message.create({ data: { content }})
})

module.exports = chatRouter