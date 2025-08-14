const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
  // Use DATABASE_URL if provided (for production)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
  });
} else {
  // Use SQLite for development (easier to set up)
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite", // This will create a file in the project root
    logging: false,
  });
}

module.exports = sequelize;
