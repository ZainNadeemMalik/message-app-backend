const { getUserFriends } = require("../model/friendsModel")

const fetchUserFriends = async (req, res) => {
  console.log(req.params)
  try {
    const userId = parseInt(req.params.id)
    const numberId = Number(userId)

    const friends = await getUserFriends(numberId)

    res.json(friends)
  } catch (error) {
    console.log('Error from friends controller', error)
    res.status(500).json({ message: 'Error fetching friends', error: error.message })
  }
}

module.exports = { fetchUserFriends }