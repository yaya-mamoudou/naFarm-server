const express = require('express');
const router = express.Router();
const { validation } = require('@models/Farm');
const { createFarm, updateFarm } = require('@controllers/Farm');

router.post('/create_farm', validation.create, createFarm);

router.put('/update_farm/:id', validation.update, updateFarm);

module.exports = router;
