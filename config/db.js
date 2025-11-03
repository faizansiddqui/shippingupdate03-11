require('dotenv').config();
const { Sequelize, DataTypes, Op } = require('sequelize');

const host = process.env.DATABASE_URL;
const db = new Sequelize(host, {
  dialect: 'postgres',
  family: 4,  // Force IPv4 resolution (4 = AF_INET; ignores IPv6)
  // Optional: Add timeouts to prevent hangs
  connectTimeout: 60000,
  requestTimeout: 60000,
  statement_timeout: false,
  query_timeout: false,
  keepAlive: true,
  logging: false  // <-- Moved here, inside the options object
});

// Authenticate connection (with proper promise handling)
db.authenticate()
  .then(() => {
    console.log('Supabase connected successfully');
  })
  .catch((error) => {
    console.error('Unable to connect to Supabase:', error);
  });

// Optional: Sync models (uncomment if needed, but use { alter: true } carefully in prod)
// db.sync({ alter: true });

module.exports = { db, DataTypes, Op };
