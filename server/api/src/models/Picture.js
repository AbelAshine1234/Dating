const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Picture = sequelize.define('Picture', {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publicId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Picture;
