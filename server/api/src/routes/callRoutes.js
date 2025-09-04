const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const callController = require('../controllers/callController');

router.use(auth);

router.post('/start', callController.startCall);
router.post('/answer', callController.answerCall);
router.post('/end', callController.endCall);

module.exports = router;


