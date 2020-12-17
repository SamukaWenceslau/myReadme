const { Sequelize } = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('users', {
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deletedFlag: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    }
});


User.sync({force: true});

module.exports = User;