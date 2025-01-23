const prisma = require('../prisma/prismaConfig');

const getUserFriends = async (userId) => {
  console.log('userid in friends model:', userId);
  try {
    const friends = await prisma.friendship.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: {
          select: {
            id: true,
            username: true, // Only select id and username
          },
        },
        user2: {
          select: {
            id: true,
            username: true, // Only select id and username
          },
        },
      },
    });

    // Return a combined list of friends (from user1 and user2), and only include their id and username
    return friends.map((friend) => {
      return friend.user1Id === userId ? { id: friend.user2.id, username: friend.user2.username } : { id: friend.user1.id, username: friend.user1.username };
    });
  } catch (error) {
    console.error(error, 'Error fetching friends from friends model');
    throw new Error('Error fetching friends from friends model');
  }
};

module.exports = { getUserFriends };
