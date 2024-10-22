const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');
const sequelize = require('./db');

const app = express();
app.use(bodyParser.json());

app.use('/transactions', transactionRoutes);

sequelize.sync().then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('Server running on http://localhost:3000');
    });
});
