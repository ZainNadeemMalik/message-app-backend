const { getUsers } = require("../model/userModel")

const sendUsers = async (req, res) => {
  try {
    const users = await getUsers()
    res.json(users)
  } catch (error) {
    console.log('Error while getting users from userController', error)
    res.status(500).json({ error: error.message, message: 'Error fetching users.' })
  }
}

module.exports = sendUsers