const express = require('express');
const router = express.Router();
const passport = require('passport');

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
    .get("/logout", (req, res, next) => {
        req.logout()
        res.redirect("/login")
    })

router 
    .post('/register', UsersController.create)
    .post('/login', passport.authenticate('local', 
    { successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true 
  }));





module.exports = router;
