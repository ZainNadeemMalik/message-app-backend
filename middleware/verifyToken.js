const jwt = require('jsonwebtoken')
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (typeof authHeader === 'undefined') return res.status(403).json({ message: 'Authorization header is missing' })

  const bearerToken = authHeader.split(' ')[1]

  if (!bearerToken) return res.status(401).json({ message: 'Token is missing. User in not logged in.' })

  jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid or expired token. Please log in again' });
    req.user = user
    next()
  })

}

const verifyRefreshToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (typeof authHeader === 'undefined') return res.status(403).json({ message: 'Authorization header is missing' })

  const bearerToken = authHeader.split(' ')[1]

  if (!bearerToken) return res.status(401).json({ message: 'Token is missing. User in not logged in.' })

  jwt.verify(bearerToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid or expired token. Please log in again' });
    req.user = user
    next()
  })

}
module.exports = { verifyAccessToken, verifyRefreshToken }