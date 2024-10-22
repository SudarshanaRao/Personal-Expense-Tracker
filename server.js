const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');
const sequelize = require('./db');

const app = express();
app.use(bodyParser.json());

app.use('/transactions', transactionRoutes);

sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
});
