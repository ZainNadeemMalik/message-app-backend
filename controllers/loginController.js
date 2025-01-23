const { validationResult } = require("express-validator")
const prisma = require("../prisma/prismaConfig")
const bcrypt = require('bcrypt')
const { generateAccessToken, generateRefreshToken } = require("../utils/tokens")

const login = async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { username, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) return res.status(404).json({ message: 'User does not exist. Sign up to use the app.' });

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) return res.status(400).json({ message: 'Incorrect password' });

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const userId = user.id

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      //secure: true, uncomment this on deployment or when sure you are using https
      sameSite: 'strict'
    })
    // see if with the refresh token needs to be sent in res.json here or if the above cookies thing is needed since you're using localstorage
    res.json({ accessToken, refreshToken, userId })
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error while logging in.' })
  }
}

module.exports = login