const prisma = require('../prisma/prismaConfig');

const sendUserMessages = async (req, res) => {

  const { userId, friendId } = req.params
  console.log('userid chatcontroller', userId, friendId)
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: parseInt(userId), recipientId: parseInt(friendId) },
          { senderId: parseInt(friendId), recipientId: parseInt(userId) }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    res.status(201).json(messages)
  } catch (error) {
    console.error('Error fetching messages: ', error),
      res.status(500).json({ error: 'Internal server error while fetching messages' })
  }


}

module.exports = { sendUserMessages }