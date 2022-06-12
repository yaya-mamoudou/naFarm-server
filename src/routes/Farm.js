const express = require('express');
const router = express.Router();
const { validation } = require('@models/Farm');
const { createFarm } = require('@controllers/Farm');

router.post('/create_farm', validation.create, createFarm);

module.exports = router;
