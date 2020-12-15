const express = require('express');
const router = express.Router();

const FilesController = require('../controller/FilesController');
const FoldersController = require('../controller/FoldersController');


router
    .get('/', FilesController.index) // Index
    .get('/file/:slug', FilesController.show) // Edit
    .get('/trash', FilesController.indexDeleted)  // Trash

router
    .post('/file/add', FilesController.create)
    .post('/file/edit', FilesController.edit)
    .post('/file/delete', FilesController.delete)
    .post('/file/restore', FilesController.restore)





module.exports = router;