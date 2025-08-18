const sequelize = require('../config/db');
const User = require('./User');
const Picture = require('./Picture');
const Payment = require('./Payment');
const Chat = require('./Chat');
const Match = require('./Match');

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

// Match associations (pair of users)
User.hasMany(Match, { foreignKey: 'userOneId', as: 'MatchesAsUserOne', onDelete: 'CASCADE' });
User.hasMany(Match, { foreignKey: 'userTwoId', as: 'MatchesAsUserTwo', onDelete: 'CASCADE' });
Match.belongsTo(User, { foreignKey: 'userOneId', as: 'UserOne' });
Match.belongsTo(User, { foreignKey: 'userTwoId', as: 'UserTwo' });

module.exports = {
  sequelize,
  User,
  Picture,
  Payment,
  Chat,
  Match,
};
