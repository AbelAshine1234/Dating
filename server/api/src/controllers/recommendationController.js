const { Op, literal } = require('sequelize');
const User = require('../models/User');

exports.getRecommendations = async (req, res) => {
  try {
    const { gender, purpose, interests = [] } = req.body;

    if (!gender || !purpose) {
      return res.status(400).json({ error: 'gender and purpose are required' });
    }

    // Base filter on gender and purpose
    const baseFilter = {
      gender,
      lookingFor: purpose,
    };

    // Find all matching users first
    let users = await User.findAll({
      where: baseFilter,
      attributes: [
        'id',
        'fullName',
        'gender',
        'lookingFor',
        'dateOfBirth',
        'description',
        'interests',
      ],
      // Randomize results
      order: literal('RANDOM()'),
      limit: 100, // Get more to apply scoring then limit later
    });

    // Recommendation logic: score users based on shared interests
    // If no interests provided, skip scoring
    if (interests.length > 0) {
      users = users.map(user => {
        const sharedInterests = user.interests
          ? user.interests.filter(i => interests.includes(i))
          : [];
        return {
          ...user.get({ plain: true }),
          score: sharedInterests.length,
        };
      });

      // Sort by score desc and limit to 20
      users = users
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
    } else {
      // If no interests filter, just limit to 20 random
      users = users.slice(0, 20);
    }

    res.json({ users });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
