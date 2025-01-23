const prisma = require('../prisma/prismaConfig')

const createFriendship = async (req, res) => {
  const { userId, friendId } = req.body
  const user1Id = Number(userId)
  const user2Id = Number(friendId)

  if (!userId || !friendId) {
    return res.status(500).json({ error: 'User and friend ID are required to create friendship.' })
  }
  try {
    // Check if the friendship already exists
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: user1Id, user2Id: user2Id },
          { user1Id: user2Id, user2Id: user1Id },
        ],
      },
    });

    if (existingFriendship) {
      return res.status(400).json({ error: 'Friendship already exists.' });
    }

    const newFriendship = await prisma.friendship.create({
      data: {
        user1Id: user1Id,
        user2Id: user2Id,
      },
    });

    res.status(201).json(newFriendship);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong while creating friendship' })
  }
}



module.exports = { createFriendship }