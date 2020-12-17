const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
    async create(req, res, next) {
        try {

            const { nickname, email, password } = req.body;
            const user = await User.findOne({ where: { email } });


            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);


            if (user == undefined) {

                   await User.create({
                        nickname,
                        email,
                        password: hash,
                    })
                        
                    res.redirect("/");
                    
            } else {
                req.flash("err", "Usuário já existe");
                res.redirect("/register");
            }
            
        } catch (error) {
            next(error)
        }
    }
}