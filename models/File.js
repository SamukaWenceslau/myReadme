const { Sequelize } = require('sequelize');
const connection = require('../database/connection');


const Folder = require('./Folder');
const User = require('./User');

const File = connection.define('files' , {
    filename: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING
    },
    deletedFlag: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    }
})

// Folder and File 

Folder.hasMany(File);
File.belongsTo(Folder);

// User and File

User.hasMany(File);
File.belongsTo(User);

// Files.sync({force: true});


