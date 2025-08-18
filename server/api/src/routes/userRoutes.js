// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadImages'); // multer configured for Cloudinary
const { validateRegister } = require('../middleware/userValidation'); // Joi validation middleware
const auth = require('../middleware/auth'); // JWT authentication middleware
const userController = require('../controllers/userController');

// // Public routes (no authentication required)
router.post(
  '/',
  upload.array('images', 5),    // multer: accept up to 5 files under "images"
  validateRegister,             // Joi validation + manual file check
  userController.register       // your controller logic
);

router.post('/login', userController.login);

// // Protected routes (authentication required)
router.use(auth);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/status', userController.updateOnlineStatus);
router.get('/browse', userController.browseUsers);


// GET ALL USERS
router.get('/', userController.getAllUsers);





module.exports = router;
