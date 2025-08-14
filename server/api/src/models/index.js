const sequelize = require('../config/db');
const User = require('./User');
const Picture = require('./Picture');
const Payment = require('./Payment');
const Chat = require('./Chat');

// User has many Pictures (one-to-many)
User.hasMany(Picture, { 
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE'
});
Picture.belongsTo(User);

// User has many Payments (one-to-many)
User.hasMany(Payment, { onDelete: 'CASCADE' });
Payment.belongsTo(User);

// Chat associations (sender/receiver)
User.hasMany(Chat, { foreignKey: 'senderId', as: 'SentChats', onDelete: 'CASCADE' });
User.hasMany(Chat, { foreignKey: 'receiverId', as: 'ReceivedChats', onDelete: 'CASCADE' });

Chat.belongsTo(User, { foreignKey: 'senderId', as: 'Sender' });
Chat.belongsTo(User, { foreignKey: 'receiverId', as: 'Receiver' });

module.exports = {
  sequelize,
  User,
  Picture,
  Payment,
  Chat,
};
