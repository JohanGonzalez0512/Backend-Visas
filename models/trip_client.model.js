const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const Trip_client = db.define('trip_client', {


    id_trip_client: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },


    id_client: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_trip: {
        type: DataTypes.INTEGER,
        allowNull: false
    },




}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Trip_client;