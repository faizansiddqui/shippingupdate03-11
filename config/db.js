require('dotenv').config();
const { Sequelize, DataTypes, Op } = require('sequelize')

const host = process.env.DATABASE_URL
const db = new Sequelize(host,
  {
    dialect: 'postgres',
    family: 4,  // Force IPv4 resolution (4 = AF_INET; ignores IPv6)
    // Optional: Add timeouts to prevent hangs
    connectTimeout: 60000,
    requestTimeout: 60000,
    statement_timeout: false,
    query_timeout: false,
    keepAlive: true
  },
  logging: false
  }
);

try {
    db.authenticate().then(() => {
        console.log('supabase connect sucessfully');
    })

    // db.sync({alter:true})
} catch (error) {

    console.error('unable to connect supabase', error);


}

module.exports = { db, DataTypes, Op }

