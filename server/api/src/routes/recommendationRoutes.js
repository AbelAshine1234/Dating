const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const auth = require('../middleware/auth');
const matchController = require('../controllers/matchController');
const multer = require('multer');
const parseForm = multer().none();

router.use(auth);

// New: get recommendations for the authenticated user (opposite gender)
router.get('/', recommendationController.getRecommendations);

// Create a match request (pending) from recommendations
router.post('/creatematch', parseForm, matchController.createMatch);

// Backward compatibility: POST /rec also works (optionally pass interests)
router.post('/rec', recommendationController.getRecommendations);

module.exports = router;
