const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Picture } = require('../models');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { email, fullName, password, gender, dateOfBirth } = req.body;

    // Validate required fields
    if (!email || !fullName || !password || !gender) {
      return res.status(400).json({ 
        error: 'Email, full name, password, and gender are required' 
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create user (password hashing handled in model hooks)
    const user = await User.create({
      ...req.body,
      callerId: `CALL-${Math.floor(100000 + Math.random() * 900000)}`,
    });

    // Save pictures metadata from uploaded files if any
    if (req.files && req.files.length > 0) {
      const pictures = req.files.map(file => ({
        url: file.path,
        publicId: file.filename,
        UserId: user.id,
      }));

      await Picture.bulkCreate(pictures);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET || 'secretkey', 
      { expiresIn: '7d' }
    );

    // Return user with pictures excluding password
    const userWithPictures = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
    });

    res.status(201).json({ 
      message: 'User created successfully', 
      token,
      user: userWithPictures 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET || 'secretkey', 
      { expiresIn: '7d' }
    );

    const userData = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
    });

    res.json({ 
      message: 'Login successful', 
      token, 
      user: userData 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
    });
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Server error while fetching profile' });
  }
};

// Add or update profile for the authenticated user
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Only allow these fields to be updated
    const allowedFields = [
      'fullName',
      'gender',
      'lookingFor',
      'caste',
      'religion',
      'occupation',
      'dateOfBirth',
      'description',
      'education',
      'interests'
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    // Normalize interests: accept array or comma-separated string
    if (typeof updates.interests === 'string') {
      updates.interests = updates.interests
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    }

    // Basic validation for enums
    if (updates.gender) {
      const genderLower = String(updates.gender).toLowerCase();
      if (!['male', 'female', 'other'].includes(genderLower)) {
        return res.status(400).json({ error: 'Invalid gender' });
      }
      updates.gender = genderLower;
    }
    if (updates.lookingFor) {
      const lookingForLower = String(updates.lookingFor).toLowerCase();
      if (!['dating', 'marriage'].includes(lookingForLower)) {
        return res.status(400).json({ error: 'Invalid lookingFor value' });
      }
      updates.lookingFor = lookingForLower;
    }

    // Apply updates
    const [affected] = await User.update(updates, { where: { id: userId } });
    if (affected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the updated user
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
    });

    return res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Update profile error:', err);
    return res.status(500).json({ error: 'Server error while updating profile' });
  }
};

// Update online/offline status for the authenticated user
exports.updateOnlineStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { isOnline } = req.body;

    let newStatus;
    if (typeof isOnline === 'boolean') {
      newStatus = isOnline;
    } else {
      const user = await User.findByPk(userId, { attributes: ['id', 'isOnline'] });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      newStatus = !user.isOnline;
    }

    const [affected] = await User.update({ isOnline: newStatus }, { where: { id: userId } });
    if (affected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
    });

    return res.json({ message: 'Status updated successfully', isOnline: newStatus, user: updatedUser });
  } catch (err) {
    console.error('Update status error:', err);
    return res.status(500).json({ error: 'Server error while updating status' });
  }
};

// Browse all users for chat (excludes current user)
exports.browseUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { limit = 50, offset = 0 } = req.query;

    // Load current user's profile to determine filters
    const currentUser = await User.findByPk(currentUserId, {
      attributes: ['id', 'gender', 'lookingFor']
    });

    if (!currentUser) {
      return res.status(404).json({ error: 'Current user not found' });
    }

    // Build where clause
    const whereClause = {
      id: { [Op.ne]: currentUserId }
    };

    // Opposite gender filter (male -> female, female -> male)
    if (currentUser.gender) {
      const genderLower = String(currentUser.gender).toLowerCase();
      if (genderLower === 'male') {
        whereClause.gender = 'female';
      } else if (genderLower === 'female') {
        whereClause.gender = 'male';
      }
      // If other/unspecified, do not filter by gender
    }

    // Match the current user's lookingFor preference if set (e.g., 'marriage')
    if (currentUser.lookingFor) {
      whereClause.lookingFor = currentUser.lookingFor;
    }

    const users = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      message: 'Users retrieved successfully',
      users: users.rows,
      total: users.count,
      hasMore: users.count > parseInt(offset) + users.rows.length
    });
  } catch (err) {
    console.error('Browse users error:', err);
    res.status(500).json({ error: 'Server error while browsing users' });
  }
};
