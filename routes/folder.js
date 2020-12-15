const express = require('express');
const router = express.Router();

const FoldersController = require('../controller/FoldersController');

/* GET home page. */
router
    .get('/file', FoldersController.index) // Add file
    .get('/folder/:slug', FoldersController.show) // Folder
    
router
    .post('/folder/add', FoldersController.create)

module.exports = router;
