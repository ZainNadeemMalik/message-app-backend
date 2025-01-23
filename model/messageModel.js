const prisma = require('../prisma/prismaConfig');

const getUserMessages = async (userId) => {
  try {
    const sentMessages = await prisma.message.findMany({
      where: { senderId: userId },
      include: { recipient: { select: { id: true, username: true } } },
    });

    const receivedMessages = await prisma.message.findMany({
      where: { recipientId: userId },
      include: { sender: { select: { id: true, username: true } } },
    });

    // Combine sent and received messages, tagging them for clarity
    const messages = [
      ...sentMessages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt,
        isRead: msg.isRead,
        type: 'sent',
        recipient: msg.recipient,
      })),
      ...receivedMessages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt,
        isRead: msg.isRead,
        type: 'received',
        sender: msg.sender,
      })),
    ];

    // Sort messages by creation time
    messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return messages; // Return the final combined and sorted list
  } catch (error) {
    console.error('Error fetching user messages:', error);
    throw new Error('Could not fetch user messages');
  }
};

module.exports = getUserMessages;
