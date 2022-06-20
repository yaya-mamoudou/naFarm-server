const express = require('express');
const router = express.Router();
const { validation } = require('@models/Investment');
const { createInvestment, userInvestments } = require('@controllers/Investment');

router.post('/new_investment', validation.create, createInvestment);
router.get('/all/:id', userInvestments);

module.exports = { investment: router };
