const express = require('express');
const router = express.Router();
const { createUser, login } = require('@controllers/User');
const { validation } = require('@models/User');

router.post('/register', validation.register, createUser);
router.post('/login', validation.login, login);

module.exports = router;
