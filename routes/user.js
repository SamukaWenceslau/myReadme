const express = require('express');
const router = express.Router();

const UsersController = require('../controller/UsersController');


router
    .get('/login', (req, res, next) => {
        try {
            res.render('login', {title: "myReadme"})
        } catch (error) {
            next(error)
        }
    })
    .get('/register', (req, res, next) => {
        try {
            res.render('register', {title: "myReadme"})
        } catch (error) {
            next(error)
        }
    })

router 
    .post('/register', UsersController.create)




module.exports = router;
