const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Transaction = sequelize.define('Transaction', {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Transaction;
