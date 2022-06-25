const express = require('express');
const router = express.Router();
const { validation } = require('@models/Interest');
const { createInterest, getInterests } = require('@controllers/Interest');

router.post('/create_interest', validation.create, createInterest);

router.get('/all', getInterests);

module.exports = { interest: router };
