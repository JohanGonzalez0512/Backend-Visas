const { Router } = require("express");
const { check } = require("express-validator");
const { login, signup } = require("../controllers/auth.controller");
const { isUsernameLengthValid, isPasswordLengthValid } = require("../helpers/db-validators");
const { validateFileds } = require("../helpers/validateFields");


const authRouter = Router();


authRouter.post('/login', [
    check('email', "El correo electronico es obligatorio").isString().notEmpty(),
    check('password', "La contraseña es obligatoria").isString().notEmpty(),
    validateFileds,
]
    , login);

authRouter.post('/signup', [
    check('email', "El correo electronico es obligatorio").isString().notEmpty(),
    check('username', "The username is required and musn't be empty").isString().notEmpty().custom(isUsernameLengthValid),
    check('password', "La contraseña es obligatoria").isString().notEmpty().custom(isPasswordLengthValid),
    validateFileds,
], signup)


module.exports = authRouter;
