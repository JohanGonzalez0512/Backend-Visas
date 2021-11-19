const { Router } = require("express");
const { check, param } = require("express-validator");
const { createAndSendCode, resetPassword } = require("../controllers/mail.controller");
const { validateFileds } = require("../helpers/validateFields");
const { checkCode } = require("../middlewares/dbValidations");
const validateJWT = require("../middlewares/validateJWT");

const emailRouter = Router();

emailRouter.post('/', [
    check('email', "El correo es obligatorio").isEmail(),
    validateFileds,
    
], createAndSendCode)

emailRouter.put('/:code', [
    param('code','El codigo de recuperacion es obligatorio').isInt().exists({checkNull:true}),
    check('password', "La descripcion del gasto es obligatoria").not().isEmpty().isLength({max:100}),
    validateFileds,
    checkCode
], resetPassword)


module.exports = emailRouter;
