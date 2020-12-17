const express = require('express');
const router = express.Router();
const { accessControl } = require('../helpers/accessControl');

const FoldersController = require('../controller/FoldersController');

/* GET home page. */
router
    .get('/file', accessControl, FoldersController.index) // Add file
    .get('/folder/:slug', accessControl, FoldersController.show) // Folder
    
router
    .post('/folder/add', accessControl, FoldersController.create)

module.exports = router;
