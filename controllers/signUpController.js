const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const prisma = require('../prisma/prismaConfig')
const { generateAccessToken, generateRefreshToken } = require('../utils/tokens')

const signUp = async (req, res) => {
  const { username, password } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } })
    if (existingUser) return res.status(409).json({ message: 'User already exists. Login to use the app.' });

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({ data: { username, password: hashedPassword } })

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const userId = user.id

    res.status(201).json({ message: 'User created successfully', accessToken, refreshToken, userId })
  } catch (error) {
    console.log('Error from signup controller', error)
    res.status(500).json({ error: error.message, message: 'Internal server error occured while signing up' })
  }
}

module.exports = { signUp }