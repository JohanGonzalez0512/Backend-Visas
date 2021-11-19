const { Router } = require("express");
const { check, param } = require("express-validator");
const { getIncomesWithNoExpenses,
        createIncome,
        updateIncome,
        deleteIncome,
        getIncomesWithExpenses } = require("../controllers/payments.controller");
const { validateFileds } = require("../helpers/validateFields");
const validateJWT = require("../middlewares/validateJWT");

const incomeRouter = Router();

incomeRouter.get('/', [
    validateJWT
], getIncomesWithNoExpenses);

incomeRouter.get('/con-gastos', [
    validateJWT
], getIncomesWithExpenses);

incomeRouter.post('/:id', [
    param('id', 'El id del cliente es obligatorio').isInt().exists({ checkNull: true }),
    check('description', "La descripcion del pago es obligatoria").not().isEmpty().isLength({ max: 100 }),
    check('date', "La fecha del pago es obligatoria").isDate(),
    check('amount', "el monto del pago es obligatorio").isFloat().exists({ checkNull: true }),
    validateFileds,
    validateJWT
], createIncome)

incomeRouter.put('/:id', [
    param('id', 'El id del pago es obligatorio').isInt().exists({ checkNull: true }),
    check('description', "La descripcion del pago es obligatoria").not().isEmpty().isLength({ max: 100 }),
    check('date', "La fecha del pago es obligatoria").isDate(),
    check('amount', "el monto del pago es obligatorio").isFloat().exists({ checkNull: true }),
    validateFileds,
    validateJWT
], updateIncome)

incomeRouter.delete('/:id', [
    param('id', 'El id del pago es obligatorio').isInt().exists({ checkNull: true }),
    validateFileds,
    validateJWT
], deleteIncome)


module.exports = incomeRouter;
