const express = require('express');
const router = express.Router();
const { accessControl } = require('../helpers/accessControl');

const FilesController = require('../controller/FilesController');



router
    .get('/', accessControl, FilesController.index) // Index
    .get('/file/:slug', accessControl, FilesController.show) // Edit
    .get('/trash', accessControl, FilesController.indexDeleted)  // Trash

router
    .post('/file/add', accessControl, FilesController.create)
    .post('/file/edit', accessControl, FilesController.edit)
    .post('/file/delete', accessControl, FilesController.delete)
    .post('/file/restore', accessControl, FilesController.restore)





module.exports = router;