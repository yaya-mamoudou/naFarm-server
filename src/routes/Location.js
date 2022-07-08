const express = require('express');
const router = express.Router();
const { validation } = require('@models/Location');
const { addLocations, getLocations } = require('@controllers/Location');

router.post('/add_locations', validation.create, addLocations);
router.get('/all', getLocations);

module.exports = { location: router };
