const http = require('http')
const { Server } = require('socket.io')
const prisma = require('./prisma/prismaConfig')
const app = require('./app')
require('dotenv').config()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET, POST'],
    credentials: true
  }
})

const users = {}

io.on('connection', (socket) => {
  console.log('User connected')

  socket.on('newMessage', async (data) => {
    const { content, senderId, recipientId } = data
    try {

      const senderIdNumber = parseInt(senderId)
      const recipientIdNumber = parseInt(recipientId)

      const message = await prisma.message.create({
        data: {
          content,
          sender: {
            connect: { id: senderIdNumber },
          },
          recipient: {
            connect: { id: recipientIdNumber }
          }
        }
      })

      if (users[recipientIdNumber]) {
        for (const recipientSocketId of users[recipientIdNumber]) {
          io.to(recipientSocketId).emit('newMessage', { id: message.id, senderId: senderIdNumber, content })
        }
      } else {
        console.log('User is offline. Message saved in database')
      }
      io.to(socket.id).emit('newMessage', message);
    } catch (error) {
      console.error('Error saving message: ', error)
    }
  })

  socket.on('register', (userId) => {
    console.log('registering userid:', userId)
    if (!users[userId]) {
      users[userId] = new Set()
    }
    users[userId].add(socket.id)
    console.log('User registered:', userId, socket.id)
    console.log('registerd users', users)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
    for (const userId in users) {
      users[userId].delete(socket.id)
      if (users[userId].size === 0) {
        delete users[userId]
      }
    }
  })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log('I am alive father'))