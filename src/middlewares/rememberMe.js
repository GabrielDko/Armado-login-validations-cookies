const fs = require("fs")
const path = require("path")
const {getJson} = require('../utility/jsonMethod')

const rememberMiddleware = (req, res, next) => {
    console.log(`Email salvado de la cookie:` + req.cookies.remember);
    if (req.cookies.remember != undefined && req.session.userLogged == undefined){
        console.log('pasó validacion!!!!!!');
        const users = getJson('usersDataBase')
        const savedEmail = req.cookies.remember; 
        const user = users.find(user => user.email === savedEmail);
        if (user) {
            console.log(`Log previo a validación ${user}`);
            req.session.userLogged = user;
            res.locals.user = req.session.userLogged;

        }

    }
    next();

};

module.exports = rememberMiddleware;