const express = require('express');
const router = express.Router();
const { createUser, login } = require('@controllers/User');
const { validation } = require('@models/User');
const upload = require('@middlewares/upload');

router.post('/register', upload.single('image'), validation.register, createUser);
router.post('/login', validation.login, login);

module.exports = { user: router };
