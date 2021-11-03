const { Router } = require("express");
const { check, param } = require("express-validator");
const { createExpense, 
        getExpenses, 
        deleteExpense, 
        updateExpense } = require("../controllers/expenses.controller");
const { validateFileds } = require("../helpers/validateFields");
const validateJWT = require("../middlewares/validateJWT");

const expenseRouter = Router();
expenseRouter.get('/', [
    validateJWT
] , getExpenses);

expenseRouter.post('/', [
    check('description', "La descripcion del gasto es obligatoria").not().isEmpty().isLength({max:100}),
    check('date', "La fecha del gasto es obligatoria").isDate(),
    check('amount',"el monto del gasto es obligatorio").isFloat().exists({checkNull:true}),
    validateFileds,
    validateJWT
], createExpense)

expenseRouter.put('/:id', [
    param('id','El id del gasto es obligatorio').isInt().exists({checkNull:true}),
    check('description', "La descripcion del gasto es obligatoria").not().isEmpty().isLength({max:100}),
    check('date', "La fecha del gasto es obligatoria").isDate(),
    check('amount',"el monto del gasto es obligatorio").isFloat().exists({checkNull:true}),
    validateFileds,
    validateJWT
], updateExpense)

expenseRouter.delete('/:id', [
    param('id','El id del viaje es obligatorio').isInt().exists({checkNull:true}),
    validateFileds,
    validateJWT
], deleteExpense)


module.exports = expenseRouter;
