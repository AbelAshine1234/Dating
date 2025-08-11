// sync-db.js (or a script file you run manually)
const sequelize = require('./db'); // adjust path
const User = require('../models/User'); // adjust paths for your models
const Picture = require('../models/Picture');
// other models...

async function resetDatabase() {
  try {
    // Drop all tables with cascade to avoid dependency errors
    await sequelize.query(`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
          EXECUTE 'DROP TABLE IF EXISTS "' || r.tablename || '" CASCADE';
        END LOOP;
      END $$;
    `);

    // Sync models (create tables fresh)
    await sequelize.sync({ force: true });
    console.log('Database dropped and recreated with CASCADE!');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();
