const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const user = require('../models/userModels')
const userController = {
    register: (req,res)=>{
        res.render('users/register',{title: 'Registro de usuario'})
    },
    processRegister: (req,res)=>{
        const errors = validationResult(req)
        console.log(errors);
        if(!errors.isEmpty()){
            res.render('users/register',{
                errors: errors.mapped(),
                oldData: req.body,
                title: 'Registro de usuario'
            })
        } else {
            let {name,email,age,color,password} = req.body
            let userData = {
                name: name.trim(),
                email: email.trim(),
                age,
                password: bcrypt.hashSync(password, 10)
            }
            
            user.create(userData)
            res.redirect('/users/login')
        }
    },
    login:(req,res)=>{
        res.render('users/login', {title: 'Login', user: req.session.userLogged})
    },
    processLogin: (req,res)=>{
    const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render('users/login',{
                errors: errors.mapped(),
                oldData: req.body,
                title: 'Login'
            })
        } else {
            const userToLogin = user.findByField('email', req.body.email)
            req.session.userLogged = userToLogin;
            req.session.userLogged.userColor = req.body.color;

            if(req.body.rememberColor != undefined){
                res.cookie('userColor', req.body.color,{maxAge: (1000 * 60) * 5})
            }

            if(req.body.remember != undefined){
                res.cookie('remember', req.body.email, {maxAge: (1000 * 60) * 5})
            }

            return res.redirect('/users/userProfile')
        }

    },
    userProfile: (req,res) =>{
        res.render('users/userProfile',{
            user: req.session.userLogged,
            title: 'Perfil del usuario'
        })
    },
    message: (req,res)=>{
        res.render('messagePage',{
            user: req.session.userLogged,
            title: 'Mensaje'
        })
    },
    logout:(req,res)=>{
        res.clearCookie('remember')
        res.clearCookie('userColor')
        req.session.destroy();
        return res.redirect('/')
    },
    clearColor:(req,res)=>{
        res.clearCookie('userColor')
        delete req.session.userLogged.userColor
        res.redirect('/')
    }
}

module.exports = userController;