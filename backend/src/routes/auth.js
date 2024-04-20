const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

//api/auth
router.post('/api/auth/register', auth.register);
router.post('/api/auth/login', auth.login);

module.exports = router;