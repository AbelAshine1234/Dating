const { Chat, User } = require('../models');
const { Op } = require('sequelize');


exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: 'senderId, receiverId, and message are required' });
    }

    // Create chat message
    const chat = await Chat.create({ senderId, receiverId, message });

    res.status(201).json({ chat });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all chats where user is sender or receiver
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: [
        { model: User, as: 'Sender', attributes: ['id', 'fullName', 'gender'] },
        { model: User, as: 'Receiver', attributes: ['id', 'fullName', 'gender'] }
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ chats });
  } catch (error) {
    console.error('Get user chats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
