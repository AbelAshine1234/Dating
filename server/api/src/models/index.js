const sequelize = require('../config/db');
const User = require('./User');
const Picture = require('./Picture');
const Payment = require('./Payment');
const Chat = require('./Chat');

// User has many Pictures (one-to-many)
User.hasMany(Picture, { 
  foreignKey: { allowNull: false },  // picture must have a userId
  onDelete: 'CASCADE' 
});
Picture.belongsTo(User);

// Other associations as before...
// User has many Payments
User.hasMany(Payment, { onDelete: 'CASCADE' });
Payment.belongsTo(User);

// User ↔ User via Chat (many-to-many)
User.belongsToMany(User, {
  through: Chat,
  as: 'Sender',
  foreignKey: 'senderId'
});
User.belongsToMany(User, {
  through: Chat,
  as: 'Receiver',
  foreignKey: 'receiverId'
});

module.exports = {
  sequelize,
  User,
  Picture,
  Payment,
  Chat
};
