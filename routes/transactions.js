const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// POST /transactions - Add new transaction
router.post('/', async (req, res) => {
   const { type, category, amount, date, description } = req.body;
   try {
       const transaction = await Transaction.create({ type, category, amount, date, description });
       res.status(201).json(transaction);
   } catch (error) {
       res.status(500).json({ error: 'Error creating transaction' });
   }
});

// GET /transactions - Retrieve all transactions
router.get('/', async (req, res) => {
   try {
       const transactions = await Transaction.findAll();
       res.json(transactions);
   } catch (error) {
       res.status(500).json({ error: 'Error fetching transactions' });
   }
});

// GET /transactions/:id - Retrieve a transaction by ID
router.get('/:id', async (req, res) => {
   const { id } = req.params;
   try {
       const transaction = await Transaction.findByPk(id);
       if (transaction) {
           res.json(transaction);
       } else {
           res.status(404).json({ error: 'Transaction not found' });
       }
   } catch (error) {
       res.status(500).json({ error: 'Error fetching transaction' });
   }
});

// PUT /transactions/:id - Update a transaction by ID
router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { type, category, amount, date, description } = req.body;
   try {
       const transaction = await Transaction.findByPk(id);
       if (transaction) {
           transaction.type = type;
           transaction.category = category;
           transaction.amount = amount;
           transaction.date = date;
           transaction.description = description;
           await transaction.save();
           res.json(transaction);
       } else {
           res.status(404).json({ error: 'Transaction not found' });
       }
   } catch (error) {
       res.status(500).json({ error: 'Error updating transaction' });
   }
});

// DELETE /transactions/:id - Delete a transaction by ID
router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   try {
       const transaction = await Transaction.findByPk(id);
       if (transaction) {
           await transaction.destroy();
           res.json({ message: 'Transaction deleted' });
       } else {
           res.status(404).json({ error: 'Transaction not found' });
       }
   } catch (error) {
       res.status(500).json({ error: 'Error deleting transaction' });
   }
});

// GET /summary - Retrieve a summary of transactions
router.get('/summary', async (req, res) => {
   try {
       const transactions = await Transaction.findAll();
       const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
       const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
       const balance = totalIncome - totalExpense;
       res.json({ totalIncome, totalExpense, balance });
   } catch (error) {
       res.status(500).json({ error: 'Error fetching summary' });
   }
});

module.exports = router;
