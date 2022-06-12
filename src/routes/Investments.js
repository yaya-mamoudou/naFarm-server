const express = require('express');
const router = express.Router();
const { validation } = require('@models/Investment');
const { createInvestment } = require('@controllers/Investment');

router.post('/new_investment', validation.create, createInvestment);

module.exports = router;
