module.exports = {
    accessControl: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login")
    },
}