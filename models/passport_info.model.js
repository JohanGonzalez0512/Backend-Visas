const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const Passport_info = db.define('passport_info',{
    id_passport_info:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },
    id_certification_type:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_client: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_expiration:{
        type:DataTypes.DATE,
        allowNull: true
    },
    curp:{
        type:DataTypes.STRING(18),
        allowNull : false,
        unique : true,
        validate : {
            notEmpty:true,
        }
    },
    expired_passport : {
        type : DataTypes.TINYINT(2),
        defaultValue : 0
    },
    
    
    
},{
    timestamps : false,
    freezeTableName: true
})

module.exports= Passport_info;