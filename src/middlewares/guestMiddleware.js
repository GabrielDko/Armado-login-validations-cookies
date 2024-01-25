


function guestMiddleware(req,res,next){
    if(req.session.userLogged){
        res.redirect('/users/userProfile')
    } else {
        next();
    }

}


module.exports = guestMiddleware;