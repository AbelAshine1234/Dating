const { sequelize, User, Picture, Payment, Chat } = require('../models'); // Import all models and their associations

(async () => {
  try {
    await sequelize.sync({ force: true });  
    console.log('Database synced successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Unable to sync database:', error);
    process.exit(1);
  }
})();
