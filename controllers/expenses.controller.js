const Expense = require("../models/expense.model");
const {db} = require("../db/connection")
const { getTotalExpensesByDate, 
        getTotalExpensesByMonth,
        getExpensesByMonth,
        getTotalExpenses } = require("../queries/queries");
const { QueryTypes } = require("sequelize");

const getExpenses = async (req, res) => {
    try {
        
        const { month } = req.query;
        const { date } = req.query;
        if(date && !month){
            const expenses = await Expense.findAll({
                where: { date }
            });
            const [total] = await db.query(getTotalExpensesByDate, { replacements: { date }, type: QueryTypes.SELECT })
    
            res.status(200).json({
                ok: true,
                expenses,
                ...total
            })
        }
        if(!date && month){
            
            const expenses = await db.query(getExpensesByMonth, { replacements: { month }, type: QueryTypes.SELECT })
            const [total] = await db.query(getTotalExpensesByMonth, { replacements: { month }, type: QueryTypes.SELECT })
    
            res.status(200).json({
                ok: true,
                expenses,
                ...total
            })
        }
        if (!date && !month) {
            const expenses = await Expense.findAll();
            const [total] = await db.query(getTotalExpenses, { replacements: { month }, type: QueryTypes.SELECT })
            res.status(200).json({
                ok: true,
                expenses,
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
const createExpense = async (req, res) => {

    const { description, date, amount  } = req.body;

    
        const expense = await Expense.create({ description, date, amount  })
        return res.status(201).json({
            ok: true,
            msg: "Gasto creado correctamente",
        })
    }




const updateExpense = async (req, res) => {

    const { id } = req.params;
    const { description, date, amount  } = req.body;

    try {
        const expense = await Expense.findByPk(id)

        if (!expense) {
            return res.status(404).json({
                msg: 'No existe un gasto con el id' + id
            });
        }

        await expense.update({description, date, amount});

        return res.status(200).json({
            ok: true,
            msg: "Gasto actualizado correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    

}
const deleteExpense = async (req, res) => {

    const { id } = req.params;
    try {
        
        const expense = await Expense.findByPk(id);
    
        if (!expense) {
            return res.status(404).json({
                msg: 'No existe un gasto con el id' + id
            });
        };
    
        await expense.destroy();
        res.status(200).json({
            ok: true,
            msg: "El gasto se elimino correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

//TODO: testear endpoints


module.exports = {

    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense


}




