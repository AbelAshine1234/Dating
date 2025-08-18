const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const matchController = require('../controllers/matchController');
const multer = require('multer');
const parseForm = multer().none();

router.use(auth);

// Create a match request (pending)
router.post('/', parseForm, matchController.createMatch);

// Accept a pending match and activate it
router.post('/accept', parseForm, matchController.acceptMatch);

// List pending match requests received by the current user
router.get('/received', matchController.listMatchesReceived);

// List matches between start and end dates (YYYY-MM-DD)
router.get('/', matchController.listMatchesByDate);

module.exports = router; 