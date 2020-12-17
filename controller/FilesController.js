const { Op } = require('sequelize');
const slugify = require('slugify');
const getDate = require('../helpers/getDate');

const File = require('../models/File');
const Folder = require('../models/Folder');


module.exports = {
    async index(req, res, next) {
        try {
            const files = await File.findAll({
                where: {
                    [Op.and]: [{userId: req.user.id}, {deletedFlag: 0}]
                },
                order: [['updatedAt', 'DESC']],
                include: [{model: Folder}]
            });
            const folders = await Folder.findAll({
                where: {userId: req.user.id}
            });
            
            res.render('index', {title: 'Todos os arquivos', files, folders});
        } catch (error) {
            next(error)
        }
    },

    async show(req, res, next) {
        try {
            const { slug } = req.params;
            
            const folders = await Folder.findAll({
                where: {userId: req.user.id}
            });
            const file = await File.findOne({
                where: {[Op.and]: [{ slug }, {userId: req.user.id}]}
            })

            res.render('edit', {title: file.filename, file, folders});
        } catch (error) {
            next(error)
        }
    },

    async create(req, res, next) {
        try {
            const {filename, folderId, body} = req.body;

            if(folderId == 0) {
                const folder = await Folder.create({
                    name: "Sem Pasta",
                    slug: slugify("Sem Pasta"),
                    userId: req.user.id
                })


                await File.create({
                    filename, 
                    folderId: folder.id,
                    slug: slugify(filename), 
                    body,
                    date_post: getDate(),
                    userId: req.user.id
                });
                req.flash("success", "Arquivo criado com sucesso")
                res.redirect('/');

            }else {
                await File.create({
                    filename, 
                    folderId,
                    slug: slugify(filename), 
                    body,
                    date_post: getDate(),
                    userId: req.user.id
                }); 

                req.flash("success", "Arquivo criado com sucesso")
                res.redirect('/');
            }


        

            
        } catch (error) {
            next(error)
        }
    },

    async edit(req, res, next) {
        try {
            const {id, filename, folderId, body} = req.body;

            await File.update({
                filename, 
                folderId,
                slug: slugify(filename), 
                body,
                date_post: getDate(),
                userId: req.user.id
            },{where: { id }});

            req.flash("success", "Arquivo atualizado");
            res.redirect(`/file/${slugify(filename)}`);
            
        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.body;

            await File.update({
                deletedFlag: 1
            }, {where: { id }});

            req.flash("success", "O arquivo foi movido para a lixeira");
            res.redirect('/');
        } catch (error) {
            next(error)
        }
    },

    async indexDeleted(req, res, next) {
        try {
            const files = await File.findAll({
                where: {
                    [Op.and]: [{userId: req.user.id}, {deletedFlag: 1}]
                },
                order: [['updatedAt', 'DESC']],
                include: [{model: Folder}]
            });
            const folders = await Folder.findAll({
                where: {userId: req.user.id}
            });
            
            res.render('trash', {title: 'Lixeira', files, folders});

        } catch (error) {
            next(error)
        }
    },

    async restore(req, res, next) {
        try {
            const { id } = req.body;

            await File.update({
                deletedFlag: 0
            }, {where: { id }});

            res.redirect('/');   
        } catch (error) {
            next(error)
        }
    }
}