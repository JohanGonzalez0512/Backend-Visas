const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const Income = db.define('incomes',{
    id_income:{
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
    id_client: {
        type: DataTypes.INTEGER,
        allowNull: false
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

module.exports= Income;