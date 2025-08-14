const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

// All chat routes require authentication
router.use(auth);

// Send a message
router.post('/send', chatController.sendMessage);

// Get all chats for a user
router.get('/user/:userId', chatController.getUserChats);

// Get conversation between two users
router.get('/conversation/:otherUserId', chatController.getConversation);

// Get unread message count
router.get('/unread-count', chatController.getUnreadCount);

// Mark messages as read
router.put('/mark-read/:senderId', chatController.markAsRead);

module.exports = router;
