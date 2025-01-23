const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '1h' })
}

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '7d' })
}

module.exports = { generateAccessToken, generateRefreshToken }