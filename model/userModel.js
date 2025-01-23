const prisma = require('../prisma/prismaConfig');

const getUsers = async () => {
  try {
    // Fetch only the necessary fields for better performance and clarity
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true, // Include fields you actually need
      },
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Could not fetch users');
  }
};

module.exports = { getUsers };
