require('dotenv').config();
const { Sequelize, DataTypes, Op } = require('sequelize')

const host = process.env.DATABASE_URL
const db = new Sequelize(host,
  {
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false } // required for Supabase
    }
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

