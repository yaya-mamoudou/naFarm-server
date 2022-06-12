const express = require('express');
const router = express.Router();
const { validation } = require('@models/Farm');
const { createFarm, updateFarm, post_farm_activity } = require('@controllers/Farm');

router.post('/create_farm', validation.create, createFarm);

router.put('/update_farm/:id', validation.update, updateFarm);

router.post('/post_farm_activity/:id', validation.post_farm_activity, post_farm_activity);

module.exports = router;
