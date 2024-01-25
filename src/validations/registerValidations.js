const {body, validationResult} = require('express-validator')
const {getJson} = require('../utility/jsonMethod')
const users = getJson('usersDataBase')


module.exports = [
    body('name')
    .notEmpty().withMessage('Este campo es obligatorio, ingrese su nombre').bail()
    .isLength({min: 5, max: 30}).withMessage('La cantidad mínima de caracteres es de 5 y la cantidad máxima de 30'),
    body('email')
    .notEmpty().withMessage('Debe ingresar un correo electrónico').bail()
    .isEmail().withMessage('Debe ingresar un formato de correo válido').bail()
    .custom((value)=>{
        const user = users.find(user => user.email === value)
        return user ? false : true
    }).withMessage('El correo electrónico ya está asociado a una cuenta existente'),
    body('age')
    .isInt().withMessage("La edad debe ser valida - solo aceptamos numeros enteros").bail()
    .custom((value)=> {
        return value >= 18;
    }).withMessage("Debe ser mayor de 18 años para registrarse"),
    body('password')
    .notEmpty().withMessage('Campo obligatorio, ingrese una contraseña').bail()
    .isLength({min: 8, max: 30}).withMessage('La cantidad mínima de caracteres es de 8 y la cantidad máxima de 30').bail()
    .custom((value,{req})=>{
        return value == req.body.repassword
    }).withMessage('Las contraseñas no coinciden')
]