const express = require('express');
const router = express.Router();
const { validation } = require('@models/Order');
const { createOrder, getOrders } = require('@controllers/Order');
const upload = require('@middlewares/upload');

router.post('/create_order', validation.create, createOrder);

router.get('/all', getOrders);

module.exports = { order: router };
