const express = require('express');
const router = express.Router();
const { validation } = require('@models/Farm');
const { createFarm, updateFarm, post_farm_activity, get_all_farms } = require('@controllers/Farm');
const upload = require('@middlewares/upload');

router.post('/create_farm', upload.single('image'), validation.create, createFarm);

router.put('/update_farm/:id', validation.update, updateFarm);

router.post(
	'/post_farm_activity/:id',
	upload.single('image'),
	validation.post_farm_activity,
	post_farm_activity
);

router.get('/all', get_all_farms);

module.exports = { farm: router };
