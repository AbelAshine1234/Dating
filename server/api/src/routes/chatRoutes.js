const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/send', chatController.sendMessage);
router.get('/user/:userId', chatController.getUserChats);

module.exports = router;
