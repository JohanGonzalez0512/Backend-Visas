const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const Trip = db.define('trips',{
    id_trip:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },
 
    limit_people:{
        type:DataTypes.INTEGER,
        allowNull : false,
        validate : {
            notEmpty:true,
        }
    },
    date:{
        type:DataTypes.DATE,
        allowNull: true
    },
    active : {
        type : DataTypes.TINYINT(2),
        defaultValue : 1
    },
    

    
},{
    timestamps : false,
})

module.exports= Trip;