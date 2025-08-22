const { Op, literal } = require('sequelize');
const { User, Picture } = require('../models');

exports.getRecommendations = async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    const { interests = [] } = req.body || {};

    if (!currentUserId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const currentUser = await User.findByPk(currentUserId, { attributes: ['id', 'gender', 'lookingFor', 'interests'] });
    if (!currentUser) {
      return res.status(404).json({ error: 'Current user not found' });
    }

    // Determine opposite gender
    let targetGender;
    const g = String(currentUser.gender || '').toLowerCase();
    if (g === 'male') targetGender = 'female';
    else if (g === 'female') targetGender = 'male';

    const baseFilter = {
      id: { [Op.ne]: currentUserId },
      lookingFor: currentUser.lookingFor,
    };
    if (targetGender) baseFilter.gender = targetGender;

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
      include: [{ model: Picture, attributes: ['url', 'publicId'] }],
      order: literal('RANDOM()'),
      limit: 100,
    });

    const seedInterests = Array.isArray(interests) && interests.length > 0 ? interests : (currentUser.interests || []);

    if (seedInterests.length > 0) {
      users = users.map(user => {
        const sharedInterests = user.interests ? user.interests.filter(i => seedInterests.includes(i)) : [];
        return { ...user.get({ plain: true }), score: sharedInterests.length };
      }).sort((a, b) => b.score - a.score).slice(0, 20);
    } else {
      users = users.map(user => user.get({ plain: true })).slice(0, 20);
    }

    res.json({ users });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
