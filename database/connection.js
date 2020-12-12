const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: "localhost",
        dialect: "mysql",
        timezone: "-03:00"
    });

module.exports = connection;