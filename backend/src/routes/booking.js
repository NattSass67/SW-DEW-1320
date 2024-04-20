const express = require('express');
const router = express.Router();
const booking = require('../controllers/booking');
const { protect, authorizeAdmin } = require('../middleware/authorize')


//api/booking
router.get('/api/booking', protect, booking.getBookingByUserID);
router.get('/api/booking/:id', protect, booking.getBookingById);
router.get('/api/admin/booking', protect, authorizeAdmin, booking.getAllBookingAdmin);
router.post('/api/booking', protect, booking.createBooking);
router.put('/api/booking/:id', protect, booking.updateBooking);
router.put('/api/admin/booking/:id', protect, authorizeAdmin, booking.updateBookingAdmin);
router.delete('/api/booking/:id', protect, booking.deleteBooking);
router.delete('/api/admin/booking/:id', protect, authorizeAdmin, booking.deleteBookingAdmin);

module.exports = router;