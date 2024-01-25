


function colorCookieMiddleware(req,res,next){
    if(req.session && req.session.userColor){
        res.locals.userColor = req.session.userColor
    }

    next()
}