const express = require('express');
const router = express.Router();
const registerValidator = require('../validations/registerValidations')
const loginValidator = require('../validations/loginValidations')
const {register, processRegister, userProfile, login, processLogin, message, clearColor, logout} = require('../controllers/userController')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')


/* GET users listing. */


// Ruta de la vista de registro de usuario
router.get('/register',guestMiddleware, register);

// Ruta de proceso del registro de usuario

router.post('/store',registerValidator, processRegister)

// Ruta de la vista de login de usuario

router.get('/login',guestMiddleware, login)


// Ruta de proceo de login del usuario 

router.post('/login', loginValidator, processLogin)

// Ruta de acceso al perfil del 

router.get('/userProfile',authMiddleware, userProfile)

// Ruta para el mensaje final del usuario

router.get('/message', message)

// Ruta para olvidar color

router.get('/clearColor' , clearColor)

// Salir de la session

router.get('/logout', logout)
module.exports = router;
