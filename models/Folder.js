const { Sequelize } = require('sequelize');
const connection = require('../database/connection');
const slugify = require('slugify'); 

const User = require('./User');

const Folder = connection.define('folders', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deletedFlag: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    }
});

User.hasMany(Folder);
Folder.belongsTo(User);

Folder.sync({force: true});

/*
(async() => {

    const noFolder = Folder.build({
        name: "Sem pasta",
        slug: slugify("Sem pasta"),
    });
    
    await noFolder.save();
    
})();
*/

module.exports = Folder;