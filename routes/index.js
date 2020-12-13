const express = require('express');
const router = express.Router();

const FilesController = require('../controller/FilesController');
const FoldersController = require('../controller/FoldersController');

/* GET home page. */
router
    .get('/', FilesController.index)
    .get('/folder/:slug', FoldersController.show)
    .get('/file', FoldersController.index)
    .get('/file/:slug', FilesController.show)
    .post('/file/add', FilesController.create)
    .post('/file/edit', FilesController.edit)
    .post('/folder/add', FoldersController.create)

module.exports = router;
