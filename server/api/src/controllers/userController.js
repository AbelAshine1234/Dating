const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Picture } = require('../models');

exports.register = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    // Create user (password hashing handled in model hooks)
    const user = await User.create({
      ...req.body,
      callerId: `CALL-${Math.floor(100000 + Math.random() * 900000)}`,
    });

    // Save pictures metadata from uploaded files
    const pictures = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      UserId: user.id,
    }));

    await Picture.bulkCreate(pictures);

    // Return user with pictures excluding password
    const userWithPictures = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
    });

    res.status(201).json({ message: 'User created successfully', user: userWithPictures });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const userData = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
    });

    res.json({ message: 'Login successful', token, user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
