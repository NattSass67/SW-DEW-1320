const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const { protect, authorizeAdmin } = require('../middleware/authorize')

//api/auth
router.post('/api/auth/register', auth.register);
router.post('/api/auth/login', auth.login);
router.get('/api/auth/logout', protect, auth.logout)

module.exports = router;