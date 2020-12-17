const slugify = require('slugify');
const Folder = require('../models/Folder');
const File = require('../models/File');
const { Op } = require('sequelize');

module.exports = {
    async index(req, res, next) {
        try {
            const folders = await Folder.findAll({
                where: {userId: req.user.id}
            });

            res.render('add', {title: "Criar arquivo", folders});
        } catch (error) {
            next(error)
        }
    },
    async show(req, res, next) {
        try {
            const { slug } = req.params;

            const folder = await Folder.findOne({
                where: {[Op.and]: [{ slug }, {userId: req.user.id}]}
            })
            
            File.findAll({
                where: {
                    [Op.and]: [{ folderId: folder.id }, {deletedFlag: 0}, {userId: req.user.id}]
                }
            }).then(files => {
                Folder.findAll({
                    where: {userId: req.user.id}
                }).then(folders => {
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
                slug: slugify(name),
                userId: req.user.id
            })

            res.redirect(`/folder/${slugify(name)}`);
        } catch (error) {
            next(error)
        }
    }

}