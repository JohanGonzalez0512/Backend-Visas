const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const User = db.define('users',{
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },
 
    username:{
        type:DataTypes.STRING(45),
        allowNull : false,
        unique : true,
        validate : {
            notEmpty:true,
        }
    },
    password:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    email:{
        type:DataTypes.STRING(35),
        allowNull : false,
        unique : true,
        validate : {
            notEmpty:true,
        }
    }
    
},{
    timestamps : false,
})

module.exports= User;