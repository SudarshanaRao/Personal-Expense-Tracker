const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/expense_tracker.sqlite'
});

module.exports = sequelize;
