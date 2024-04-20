const express = require('express');
const router = express.Router();
const dentist = require('../controllers/dentist');
const { protect, authorizeAdmin } = require('../middleware/authorize')

//api/dentist
router.get('/api/dentist', dentist.getAllDentists);
router.get('/api/dentist/:id', dentist.getDentistById);
router.post('/api/dentist', protect, authorizeAdmin, dentist.createDentist);
router.put('/api/dentist/:id', protect, authorizeAdmin, dentist.updateDentist);
router.delete('/api/dentist/:id', protect, authorizeAdmin, dentist.deleteDentist);

module.exports = router;