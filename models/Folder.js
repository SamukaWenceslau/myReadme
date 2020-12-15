const { Sequelize } = require('sequelize');
const connection = require('../database/connection');
const slugify = require('slugify'); 

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

/*
(async() => {
    await Folder.sync({force: true});

    const noFolder = Folder.build({
        name: "Sem pasta",
        slug: slugify("Sem pasta"),
    });
    
    await noFolder.save();
    
})();
*/

module.exports = Folder;