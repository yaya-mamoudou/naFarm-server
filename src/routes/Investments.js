const express = require('express');
const router = express.Router();
const { validation } = require('@models/Investment');
const { createInvestment, userInvestments, totalAmount } = require('@controllers/Investment');

router.post('/new_investment', validation.create, createInvestment);
router.get('/all/', userInvestments);
router.get('/all/:id', userInvestments);
router.get('/total_amount', totalAmount);
router.get('/total_amount/:id', totalAmount);

module.exports = { investment: router };
