const express = require('express');
const router = express.Router();
const { validation } = require('@models/Product');
const { createProducts, getProducts } = require('@controllers/Product');
const upload = require('@middlewares/upload');

router.post('/create_product', upload.any('images'), validation.create, createProducts);

router.get('/all', getProducts);

module.exports = { product: router };
