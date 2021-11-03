const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const Expense = db.define('expenses',{
    id_expense:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },
 
    description:{
        type:DataTypes.STRING(100),
        allowNull : false,
        validate : {
            notEmpty:true,
        }
    },
    date:{
        type:DataTypes.DATE,
        allowNull: false
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull: false
    }
    
},{
    timestamps : false,
})

module.exports= Expense;