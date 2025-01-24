const express = require('express')
const cors = require('cors')
const loginRouter = require('./routes/loginRoutes')
const signUpRouter = require('./routes/signUpRoutes')
const tokenRouter = require('./routes/tokenRoutes')
const friendsRouter = require('./routes/friendsRoutes')
const userRouter = require('./routes/userRouter')
const messageRouter = require('./routes/messageRouter')
const friendShipRouter = require('./routes/friendShipRouter')
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ['GET, POST'],
  credentials: true
}))

app.use('/login', loginRouter)
app.use('/signup', signUpRouter)
app.use('/refreshAccessToken', tokenRouter)
app.use('/fetchFriends', friendsRouter)
app.use('/fetchUsers', userRouter)
app.use('/fetchMessages', messageRouter)
app.use('/addFriend', friendShipRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    },
  });
});

module.exports = app
