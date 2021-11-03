const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const Client = db.define('clients',{
    id_client:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },
 
    name:{
        type:DataTypes.STRING(50),
        allowNull : false,
        unique : true,
        validate : {
            notEmpty:true,
        }
    },
    last_name:{
        type:DataTypes.STRING(50),
        allowNull : false,
        unique : true,
        validate : {
            notEmpty:true,
        }
    },
    address:{
        type:DataTypes.STRING(120),

    },
    birthday:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    phone_number:{
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    active : {
        type : DataTypes.TINYINT(2),
        defaultValue : 1
    },
    
},{
    timestamps : false,
})

module.exports= Client;