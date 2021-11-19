const Expense = require("../models/expense.model");
const Income = require("../models/income.model")
const { db } = require("../db/connection")
const { getIncomesByDate,
    getIncomesByMonth,
    getTotalIncomes,
    getTotalIncomesByDate,
    getTotalIncomesByMonth,
    getExpensesByMonth,
    getTotalExpensesByMonth, 
    getTotalExpensesByDate,
    getTotalExpenses} = require("../queries/queries");
const { QueryTypes } = require("sequelize");
const moment = require("moment");
const getIncomesWithNoExpenses = async (req, res) => {
    try {

        const { month } = req.query;
        const { date } = req.query;
        if (date && !month) {
            const incomes = await db.query(getIncomesByDate, { replacements: { date }, type: QueryTypesyTypes.SELECT })
            const [total] = await db.query(getTotalIncomesByDate, { replacements: { date }, type: QueryTypes.SELECT })

            res.status(200).json({
                ok: true,
                incomes,
                ...total
            })
        }
        if (!date && month) {

            const incomes = await db.query(getIncomesByMonth, { replacements: { month }, type: QueryTypes.SELECT })
            const [total] = await db.query(getTotalIncomesByMonth, { replacements: { month }, type: QueryTypes.SELECT })

            res.status(200).json({
                ok: true,
                incomes,
                ...total
            })
        }
        if (!date && !month) {
            const incomes = await Income.findAll();
            const [total] = await db.query(getTotalIncomes, { replacements: { month }, type: QueryTypes.SELECT })
            res.status(200).json({
                ok: true,
                incomes,
                ...total
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const createIncome = async (req, res) => {
    const { id } = req.params
    const { description, date, amount } = req.body;


    const income = await Income.create({ id_client: id, description, date, amount })
    return res.status(201).json({
        ok: true,
        msg: "Pago creado correctamente",
    })
}




const updateIncome = async (req, res) => {

    const { id } = req.params;
    const { description, date, amount } = req.body;

    try {
        const income = await Income.findByPk(id)

        if (!income) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un pago con el id' + id
            });
        }

        await income.update({ description, date, amount });

        return res.status(200).json({
            ok: true,
            msg: "Pago actualizado correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
const deleteIncome = async (req, res) => {

    const { id } = req.params;
    try {

        const income = await Income.findByPk(id);

        if (!income) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un pago con el id' + id
            });
        };

        await income.destroy();
        res.status(200).json({
            ok: true,
            msg: "El pago se elimino correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const getIncomesWithExpenses = async (req, res) => {
    //TODO: MES ACTUAL
    // moment().format('YYYY-MM-DD')
    const { month, year} = req.query;
    try {
        if (month && year){

            let incomes = await db.query(getIncomesByMonth, { replacements: { month, year }, type: QueryTypes.SELECT })
            if (!incomes) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un pago con ese mes'
                });
            };
            let [{ total: totalIncomes }] = await db.query(getTotalIncomesByMonth, { replacements: { month, year }, type: QueryTypes.SELECT })
            if (!totalIncomes) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un total de pagos con ese mes'
                });
            };
            let expenses = await db.query(getExpensesByMonth, { replacements: { month, year }, type: QueryTypes.SELECT })
            if (!expenses) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un gasto con ese mes'
                });
            };
            const [{ total: totalExpenses }] = await db.query(getTotalExpensesByMonth, { replacements: { month, year }, type: QueryTypes.SELECT })
            if (!totalExpenses) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un total de gastos con ese mes'
                });
            };

            incomes = incomes.map( (income) => {
                const {id_income, description, id_client, date, amount} = income
                return {
                    id_income,
                    description,
                    id_client,
                    date,
                    amount,
                    type:'Pago'
                }
            })

            expenses = expenses.map( (expense) => {
                const {id_expense, description, date, amount}= expense
                return {
                    id_expense,
                    description,
                    date,
                    amount,
                    type:'Gasto'
                }
            })
    
            const totalWithExpenes = totalIncomes - totalExpenses
            return res.status(200).json({
                ok: true,
                payments: [...incomes,...expenses],
                totalIncomes:totalIncomes.toFixed(2),
                totalExpenses:totalExpenses.toFixed(2),
                totalPaymentsWithExpenes:totalWithExpenes.toFixed(2),
               
            })
    
        }
        else {

            let incomes = await Income.findAll();
            if (!incomes) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe ningun pago'
                });
            };
            let [{ total: totalIncomes }] = await db.query(getTotalIncomes, {type: QueryTypes.SELECT })
            if (!totalIncomes) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un total de pagos'
                });
            };
            let expenses = await Expense.findAll();
            if (!expenses) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe ningun gasto'
                });
            };
            const [{ total: totalExpenses }] = await db.query(getTotalExpenses, {type: QueryTypes.SELECT })
            if (!totalExpenses) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un total de gastos con ese mes'
                });
            };

            incomes = incomes.map( (income) => {
                const {id_income, description, id_client, date, amount} = income
                return {
                    id_income,
                    description,
                    id_client,
                    date,
                    amount,
                    type:'Pago'
                }
            })

            expenses = expenses.map( (expense) => {
                const {id_expense, description, date, amount}= expense
                return {
                    id_expense,
                    description,
                    date,
                    amount,
                    type:'Gasto'
                }
            })
    
            const totalWithExpenes = totalIncomes - totalExpenses
            return res.status(200).json({
                ok: true,
                payments: [...incomes,...expenses],
                totalIncomes:totalIncomes.toFixed(2),
                totalExpenses:totalExpenses.toFixed(2),
                totalPaymentsWithExpenes:totalWithExpenes.toFixed(2),
              
            })

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

module.exports = {

    getIncomesWithNoExpenses,
    createIncome,
    updateIncome,
    deleteIncome,
    getIncomesWithExpenses


}




