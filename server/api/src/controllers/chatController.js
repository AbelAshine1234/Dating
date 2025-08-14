const { Chat, User } = require('../models');
const { Op } = require('sequelize');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id; // Get from authenticated user

    if (!receiverId || !message) {
      return res.status(400).json({ 
        error: 'Receiver ID and message are required' 
      });
    }

    if (senderId === receiverId) {
      return res.status(400).json({ 
        error: 'Cannot send message to yourself' 
      });
    }

    // Check if receiver exists
    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: 'Receiver not found' });
    }

    // Create chat message
    const chat = await Chat.create({ 
      senderId, 
      receiverId, 
      message: message.trim() 
    });

    // Get the created message with sender info
    const messageWithSender = await Chat.findByPk(chat.id, {
      include: [
        { model: User, as: 'Sender', attributes: ['id', 'fullName', 'gender'] },
        { model: User, as: 'Receiver', attributes: ['id', 'fullName', 'gender'] }
      ]
    });

    res.status(201).json({ 
      message: 'Message sent successfully',
      chat: messageWithSender 
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    // Ensure user can only access their own chats
    if (parseInt(userId) !== currentUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }

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

    res.json({ 
      message: 'Chats retrieved successfully',
      chats 
    });
  } catch (error) {
    console.error('Get user chats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get conversation between two users
exports.getConversation = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const currentUserId = req.user.id;

    if (!otherUserId) {
      return res.status(400).json({ error: 'Other user ID is required' });
    }

    // Fetch conversation between two users
    const messages = await Chat.findAll({
      where: {
        [Op.or]: [
          { senderId: currentUserId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: currentUserId }
        ]
      },
      include: [
        { model: User, as: 'Sender', attributes: ['id', 'fullName', 'gender'] },
        { model: User, as: 'Receiver', attributes: ['id', 'fullName', 'gender'] }
      ],
      order: [['createdAt', 'ASC']],
    });

    // Mark messages as read if they were sent to current user
    await Chat.update(
      { read: true },
      {
        where: {
          senderId: otherUserId,
          receiverId: currentUserId,
          read: false
        }
      }
    );

    res.json({ 
      message: 'Conversation retrieved successfully',
      messages 
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get unread message count
exports.getUnreadCount = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const unreadCount = await Chat.count({
      where: {
        receiverId: currentUserId,
        read: false
      }
    });

    res.json({ 
      message: 'Unread count retrieved successfully',
      unreadCount 
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { senderId } = req.params;
    const currentUserId = req.user.id;

    await Chat.update(
      { read: true },
      {
        where: {
          senderId: senderId,
          receiverId: currentUserId,
          read: false
        }
      }
    );

    res.json({ 
      message: 'Messages marked as read successfully'
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
