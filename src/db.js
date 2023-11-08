require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_DB_USER_NAME, process.env.PG_DB_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
});

module.exports = { sequelize };
