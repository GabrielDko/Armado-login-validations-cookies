const {body} = require('express-validator')
const user = require('../models/userModels')
const bcrypt = require('bcryptjs')


module.exports = [
    body('name')
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min: 5, max: 30}).withMessage('La cantidad de carácteres es de mínimo 5 y máximo 30')
    .custom((value)=>{
        const userFound = user.findByField('name', value)
        
        return userFound ? true : false
    
    }).withMessage('Nombre de usuario incorrecto'),
    body('email')
    .notEmpty().withMessage('Debes ingresar tu correo electrónico').bail()
    .isEmail().withMessage('Debes ingresar un formato de correo electrónico válido').bail()
    .custom((value)=>{
        const userFound = user.findByField('email', value)
        return userFound ? true : false
    }).withMessage('Credenciales inválidas'),
    body('color')
    .notEmpty().withMessage('Debe elegir un color'),
    body('password')
    .notEmpty().withMessage('Debe ingresar su contraseña').bail()
    .custom((value, { req })=>{
        console.log(`Contraseña que me pasan ${value}`);
        const userFound = user.findByField('email', req.body.email)

            return bcrypt.compareSync(value, userFound.password)

        }).withMessage("Credenciales inválidas"),
    body('age')
    .notEmpty().withMessage('Debe ingresar su edad').bail()
    .isInt().withMessage('Su edad debe ser un número entero').bail()
]