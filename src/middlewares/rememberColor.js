const rememberColorMiddleware = (req,res,next)=> {
    console.log(req.session.userLogged);
    if(req.cookies.userColor && req.session.userLogged){
        req.session.userLogged = {
            userColor: req.cookies.userColor
        }
        res.locals.user = req.session.userLogged
    }
    next();
}

module.exports = rememberColorMiddleware;