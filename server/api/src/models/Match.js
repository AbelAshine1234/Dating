const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Match = sequelize.define('Match', {
  userOneId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userTwoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  requestedByUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'unmatched'),
    allowNull: false,
    defaultValue: 'pending'
  },
  matchedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['userOneId', 'userTwoId']
    }
  ],
  hooks: {
    beforeValidate: (match) => {
      // Ensure canonical ordering (smaller id is userOneId) to enforce uniqueness for a pair
      if (match.userOneId != null && match.userTwoId != null && match.userOneId > match.userTwoId) {
        const temp = match.userOneId;
        match.userOneId = match.userTwoId;
        match.userTwoId = temp;
      }
    }
  }
});

module.exports = Match; 