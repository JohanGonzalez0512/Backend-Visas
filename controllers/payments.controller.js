const Expense = require("../models/expense.model");
const Income = require("../models/income.model")


const getIncomesWithNoExpenses = async (req, res) => {
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
const createIncome = async (req, res) => {
    const [id] = req.params
    const { description, date, amount } = req.body;


        const income = await Income.create({ id_client: id,description, date, amount  })
        return res.status(201).json({
            ok: true,
            msg: "Pago creado correctamente",
        })
    }




const updateIncome = async (req, res) => {

    const { id } = req.params;
    const { description, date, amount  } = req.body;

    try {
        const income = await Income.findByPk(id)

        if (!income) {
            return res.status(404).json({
                msg: 'No existe un pago con el id' + id
            });
        }

        await income.update({description, date, amount});

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

//TODO: HACER ENDPOINT INCOMESWITHEXPENSES Y HACER RUTAS y get incomes
module.exports = {

    getIncomes,
    createIncome,
    updateIncome,
    deleteIncome


}




