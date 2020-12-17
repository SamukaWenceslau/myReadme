const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');

module.exports = passport => {
    passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
        
        
        User.findOne({where: {email: email}}).then((user) => {

                if(!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                bcrypt.compare(password, user.password, (err, result) => {
                    if(result) {
                        return done(null, user);
                    }else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                })    
            });
        
    }));


    // Salvando dados em uma seção

    passport.serializeUser((user, done) => {

        done(null, user.id);

    });

    passport.deserializeUser((id, done) => {

        User.findByPk(id).then(user => {
            done(null, user)
        }).catch(err => {
            done(null, err)
        })

    });

}