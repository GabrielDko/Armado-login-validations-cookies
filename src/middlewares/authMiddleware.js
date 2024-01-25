function authMiddleware(req,res,next){
    if(!req.session.userLogged){
        res.redirect('/users/login')
    } else {
        next();
    }

}


module.exports = authMiddleware;