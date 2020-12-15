const slugify = require('slugify');
const getDate = require('../helpers/getDate');
const File = require('../models/File');
const Folder = require('../models/Folder');


module.exports = {
    async index(req, res, next) {
        try {
            const files = await File.findAll({
                where: {deletedFlag: 0},
                include: [{model: Folder}]
            });
            const folders = await Folder.findAll();
            
            res.render('index', {title: 'All', files, folders});
        } catch (error) {
            next(error)
        }
    },

    async show(req, res, next) {
        try {
            const { slug } = req.params;
            
            const folders = await Folder.findAll();
            const file = await File.findOne({
                where: { slug }
            })

            res.render('edit', {title: file.name, file, folders});
        } catch (error) {
            next(error)
        }
    },

    async create(req, res, next) {
        try {
            const {filename, folderId, body} = req.body;

            await File.create({
                filename, 
                folderId,
                slug: slugify(filename), 
                body,
                date_post: getDate()
            });

            res.redirect('/');
        

            
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
                date_post: getDate()
            },{where: { id }});

            res.redirect('/');
            
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

            res.redirect('/');
        } catch (error) {
            next(error)
        }
    },

    async indexDeleted(req, res, next) {
        try {
            const files = await File.findAll({
                where: {deletedFlag: 1},
                include: [{model: Folder}]
            });
            const folders = await Folder.findAll();
            
            res.render('trash', {title: 'Trash', files, folders});

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