const express = require('express');
const router = express.Router();
const { validation } = require('@models/Discovery');
const { createDiscovery, getDiscoveries } = require('@controllers/Discovery');
const upload = require('@middlewares/upload');

router.post('/create_discovery', upload.single('image'), validation.create, createDiscovery);
router.get('/all', getDiscoveries);

module.exports = { discovery: router };
