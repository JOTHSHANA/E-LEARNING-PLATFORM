const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false,  
      },
    },
  }
);

module.exports = sequelize;

// const { Sequelize } = require('sequelize');
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });;

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   protocol: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//     family: 4,
//   },
//   logging: false,
// });

// module.exports = sequelize;
