const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Chat = sequelize.define('Chat', {
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Chat;
