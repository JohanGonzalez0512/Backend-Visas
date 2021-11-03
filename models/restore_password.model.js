const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const Restore_password = db.define('incomes',{
    id_restore_password:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },
 
    code:{
        type:DataTypes.STRING(100),
        allowNull : true,
        
    },
    expiration_date:{
        type:DataTypes.DATE,
        allowNull: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps : false,
})

module.exports= Restore_password;