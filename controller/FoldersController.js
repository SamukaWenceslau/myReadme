const slugify = require('slugify');
const Folder = require('../models/Folder');
const File = require('../models/File');
const { Op } = require('sequelize');

module.exports = {
    async index(req, res, next) {
        try {
            const folders = await Folder.findAll();

            res.render('add', {title: "Add", folders});
        } catch (error) {
            next(error)
        }
    },
    async show(req, res, next) {
        try {
            const { slug } = req.params;

            const folder = await Folder.findOne({
                where: { slug }
            })
            
            File.findAll({
                where: {
                    [Op.and]: [{ folderId: folder.id }, {deletedFlag: 0}]
                }
            }).then(files => {
                Folder.findAll().then(folders => {
                    res.render('folder', {
                        title: folder.name,
                        files,
                        folders
                    })
                })
            })

        } catch (error) {
            next(error)            
        }
    },
    async create(req, res, next) {
        try {
            const { name } = req.body;

            await Folder.create({
                name,
                slug: slugify(name)
            })

            res.redirect(`/folder/${slugify(name)}`);
        } catch (error) {
            next(error)
        }
    }

}