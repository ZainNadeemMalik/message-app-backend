const { generateAccessToken } = require("../utils/tokens")

const newAccessToken = (req, res) => {
  const { user } = req.user
  const accessToken = generateAccessToken(user)

  res.json(accessToken)
}

module.exports = newAccessToken