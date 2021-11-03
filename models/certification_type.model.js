const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const Certification_type = db.define('Certification_types',{
    id_certification_type:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },
 
    name:{
        type:DataTypes.STRING(90),
        allowNull : false,
        unique : true,
        validate : {
            notEmpty:true,
        }
    },
   
    
},{
    timestamps : false,
})

module.exports= Certification_type;