const express = require('express');
const router = express.Router();
const { validation } = require('@models/Order');
const { createOrder, getOrders } = require('@controllers/Order');

router.post('/create_order', validation.create, createOrder);

router.get('/all', getOrders);
router.get('/all/:id', getOrders);

module.exports = { order: router };
