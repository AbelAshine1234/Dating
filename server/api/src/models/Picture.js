const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Picture = sequelize.define('Picture', {
  // wE STORE IMAGE THERE AMND WE ATTACH THE URL HERE
  // Url in 3rd pary apps 
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
