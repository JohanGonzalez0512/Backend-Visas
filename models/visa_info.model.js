const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const Visa_info = db.define('visa_info',{
    id_visa_info:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },
    sheet_visa_payment : {
        type : DataTypes.TINYINT(2),
        defaultValue : 0
    },
    copy_passport : {
        type : DataTypes.TINYINT(2),
        defaultValue : 0
    },
    right_visa : {
        type : DataTypes.TINYINT(2),
        defaultValue : 0
    },
    picture_visa : {
        type : DataTypes.TINYINT(2),
        defaultValue : 0
    },
    accepted : {
        type : DataTypes.TINYINT(2),
        defaultValue : 0
    },
    date_expiration:{
        type:DataTypes.DATE,
        allowNull: true
    },
    id_client: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    
    
},{
    timestamps : false,
    freezeTableName: true
})

module.exports= Visa_info;