const { Op } = require('sequelize');
const { Match, User } = require('../models');

function parseTargetUserId(req) {
  const raw = req.body.userId ?? req.body.otherUserId ?? req.body.id ?? req.query.userId ?? req.query.otherUserId ?? req.query.id;
  if (raw === undefined || raw === null) return { value: null, raw };
  const str = String(raw).trim();
  const num = parseInt(str, 10);
  if (Number.isNaN(num)) return { value: null, raw };
  return { value: num, raw };
}

exports.createMatch = async (req, res) => {
  try {
    const { value: otherUserId, raw } = parseTargetUserId(req);
    const currentUserId = Number(req.user.id);

    if (!Number.isInteger(otherUserId) || otherUserId <= 0) {
      return res.status(400).json({ error: 'Invalid other user id', received: raw });
    }
    if (otherUserId === currentUserId) {
      return res.status(400).json({ error: 'Cannot match yourself' });
    }

    // Fetch the target user first
    const otherUser = await User.findByPk(otherUserId, { attributes: ['id', 'gender', 'lookingFor'] });
    if (!otherUser) {
      return res.status(404).json({ error: 'Other user not found' });
    }

    // Load current user for validation
    const currentUser = await User.findByPk(currentUserId, { attributes: ['id', 'gender', 'lookingFor'] });

    const curGender = String(currentUser.gender || '').toLowerCase();
    const othGender = String(otherUser.gender || '').toLowerCase();

    // Enforce opposite gender only (male <-> female)
    const isOppositeGender =
      (curGender === 'male' && othGender === 'female') ||
      (curGender === 'female' && othGender === 'male');
    if (!isOppositeGender) {
      return res.status(400).json({ error: 'Matches are only allowed between opposite genders' });
    }

    // Enforce same purpose (dating/marriage)
    if (String(currentUser.lookingFor) !== String(otherUser.lookingFor)) {
      return res.status(400).json({ error: 'Both users must be looking for the same purpose' });
    }

    // Create or update to pending
    const [match, created] = await Match.findOrCreate({
      where: {
        userOneId: Math.min(currentUserId, otherUserId),
        userTwoId: Math.max(currentUserId, otherUserId)
      },
      defaults: {
        status: 'pending',
        requestedByUserId: currentUserId,
      }
    });

    if (!created) {
      if (match.status === 'active') {
        return res.status(200).json({ message: 'Users are already matched', match });
      }
      if (match.status === 'pending') {
        return res.status(200).json({ message: 'Match request already pending', match });
      }
      match.status = 'pending';
      match.requestedByUserId = currentUserId;
      await match.save();
    }

    const populated = await Match.findByPk(match.id, {
      include: [
        { model: User, as: 'UserOne', attributes: ['id', 'fullName'] },
        { model: User, as: 'UserTwo', attributes: ['id', 'fullName'] },
      ]
    });

    return res.status(201).json({ message: 'Match request sent', match: populated });
  } catch (err) {
    console.error('Create match error:', err);
    return res.status(500).json({ error: 'Server error while creating match' });
  }
};

exports.acceptMatch = async (req, res) => {
  try {
    const { value: otherUserId, raw } = parseTargetUserId(req);
    const currentUserId = Number(req.user.id);

    if (!Number.isInteger(otherUserId) || otherUserId <= 0) {
      return res.status(400).json({ error: 'Invalid other user id', received: raw });
    }
    if (otherUserId === currentUserId) {
      return res.status(400).json({ error: 'Cannot match yourself' });
    }

    // Fetch the target user first
    const otherUser = await User.findByPk(otherUserId, { attributes: ['id', 'gender', 'lookingFor'] });
    if (!otherUser) {
      return res.status(404).json({ error: 'Other user not found' });
    }

    // Load current user for validation
    const currentUser = await User.findByPk(currentUserId, { attributes: ['id', 'gender', 'lookingFor'] });

    // Same validations as request
    const curGender = String(currentUser.gender || '').toLowerCase();
    const othGender = String(otherUser.gender || '').toLowerCase();
    const isOppositeGender =
      (curGender === 'male' && othGender === 'female') ||
      (curGender === 'female' && othGender === 'male');
    if (!isOppositeGender) {
      return res.status(400).json({ error: 'Matches are only allowed between opposite genders' });
    }
    if (String(currentUser.lookingFor) !== String(otherUser.lookingFor)) {
      return res.status(400).json({ error: 'Both users must be looking for the same purpose' });
    }

    // Find the existing pair
    const userOneId = Math.min(currentUserId, otherUserId);
    const userTwoId = Math.max(currentUserId, otherUserId);
    const match = await Match.findOne({ where: { userOneId, userTwoId } });
    if (!match) {
      return res.status(404).json({ error: 'No pending match found for this pair' });
    }

    if (match.status === 'active') {
      return res.status(200).json({ message: 'Users are already matched', match });
    }

    // Activate the match
    match.status = 'active';
    match.matchedAt = new Date();
    await match.save();

    // Increment both users' match counts on acceptance
    await User.increment({ matchesCount: 1 }, { where: { id: currentUserId } });
    await User.increment({ matchesCount: 1 }, { where: { id: otherUserId } });

    const populated = await Match.findByPk(match.id, {
      include: [
        { model: User, as: 'UserOne', attributes: ['id', 'fullName'] },
        { model: User, as: 'UserTwo', attributes: ['id', 'fullName'] },
      ]
    });

    return res.json({ message: 'Match accepted. Users are now matched.', match: populated });
  } catch (err) {
    console.error('Accept match error:', err);
    return res.status(500).json({ error: 'Server error while accepting match' });
  }
};

exports.listMatchesReceived = async (req, res) => {
  try {
    const currentUserId = Number(req.user.id);

    // pending requests where you are not the requester
    const pending = await Match.findAll({
      where: {
        status: 'pending',
        requestedByUserId: { [Op.ne]: currentUserId },
        [Op.or]: [
          { userOneId: currentUserId },
          { userTwoId: currentUserId }
        ]
      },
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, as: 'UserOne', attributes: ['id', 'fullName'] },
        { model: User, as: 'UserTwo', attributes: ['id', 'fullName'] },
      ]
    });

    return res.json({ pending });
  } catch (err) {
    console.error('List matches received error:', err);
    return res.status(500).json({ error: 'Server error while fetching received matches' });
  }
};

exports.listMatchesByDate = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { start, end } = req.query;

    const where = {
      status: 'active',
      [Op.or]: [
        { userOneId: currentUserId },
        { userTwoId: currentUserId }
      ]
    };

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
      where.matchedAt = { [Op.between]: [startDate, endDate] };
    }

    const matches = await Match.findAll({
      where,
      order: [['matchedAt', 'DESC']],
      include: [
        { model: User, as: 'UserOne', attributes: ['id', 'fullName'] },
        { model: User, as: 'UserTwo', attributes: ['id', 'fullName'] },
      ]
    });

    return res.json({ matches });
  } catch (err) {
    console.error('List matches error:', err);
    return res.status(500).json({ error: 'Server error while listing matches' });
  }
}; 