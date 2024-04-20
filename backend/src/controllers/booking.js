
const pool = require('../db/database');

// POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const { dentistId, bookingDate } = req.body;

        // Insert the new booking into the database
        const query = `
          INSERT INTO bookings (user_id, dentist_id, booking_date)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const values = [req.user.id, dentistId, bookingDate];
        const client = await pool.connect();
        const result = await client.query(query, values);

        // Return the newly created booking
        res.status(201).json({ success: true, data: result.rows[0] });
        client.release();
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// GET /api/bookings/user
const getBookingByUserID = async (req, res) => {
    try {
        const query = `
            SELECT * FROM bookings
            WHERE user_id = $1;
        `;
        const values = [req.user.id];
        const client = await pool.connect();
        const result = await client.query(query, values);
        const bookings = result.rows;
        res.status(200).json({ success: true, data: bookings });
        client.release();
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// PUT /api/bookings/:bookingId
const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { bookingDate } = req.body;

        // Fetch the booking information from the database
        const query = `
            SELECT * FROM bookings
            WHERE id = $1;
        `;
        const values = [bookingId];
        const client = await pool.connect();
        const result = await client.query(query, values);
        const booking = result.rows[0];

        // If the booking doesn't exist, return a 404 error
        if (!booking) {
            client.release();
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Check if the user owns this booking
        if (req.user.id !== booking.user_id) {
            client.release();
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Update the booking date
        const updateQuery = `
            UPDATE bookings
            SET booking_date = $1
            WHERE id = $2
            RETURNING *;
        `;
        const updateValues = [bookingDate, bookingId];
        const updateResult = await client.query(updateQuery, updateValues);
        const updatedBooking = updateResult.rows[0];

        // Release the client and send the response
        client.release();
        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



// DELETE /api/bookings/:bookingId
const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        // Fetch the booking information from the database
        const query = `
            SELECT * FROM bookings
            WHERE id = $1;
        `;
        const values = [bookingId];
        const client = await pool.connect();
        const result = await client.query(query, values);
        const booking = result.rows[0];

        // If the booking doesn't exist, return a 404 error
        if (!booking) {
            client.release();
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Check if the user owns this booking
        if (req.user.id !== booking.user_id) {
            client.release();
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Delete the booking
        const deleteQuery = `
            DELETE FROM bookings
            WHERE id = $1;
        `;
        await client.query(deleteQuery, values);

        // Send success response
        res.status(200).json({ success: true, message: 'Booking deleted successfully' });

        // Release the client
        client.release();
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// GET /api/admin/bookings
const getAllBookingAdmin = async (req, res) => {
    try {
        const query = `
            SELECT * FROM bookings;
        `;
        const client = await pool.connect();
        const result = await client.query(query);
        const bookings = result.rows;
        res.status(200).json({ success: true, data: bookings });
        client.release();
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// PUT /api/admin/bookings/:bookingId 
const updateBookingAdmin = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { bookingDate } = req.body;

        // Fetch the booking information from the database
        const query = `
            SELECT * FROM bookings
            WHERE id = $1;
        `;
        const values = [bookingId];
        const client = await pool.connect();
        const result = await client.query(query, values);
        const booking = result.rows[0];

        // If the booking doesn't exist, return a 404 error
        if (!booking) {
            client.release();
            return res.status(404).json({error: 'Booking not found' });
        }


        const updateQuery = `
            UPDATE bookings
            SET booking_date = $1
            WHERE id = $2
            RETURNING *;
        `;
        const updateValues = [bookingDate, bookingId];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedBooking = updatedResult.rows[0];
        res.status(200).json({ success: true, data: updatedBooking });
        client.release();
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// DELETE /api/admin/bookings/:bookingId
const deleteBookingAdmin = async (req, res) => {
    try {
        const bookingId = req.params.id;

        // Check if the booking exists
        const checkQuery = `
            SELECT id FROM bookings
            WHERE id = $1;
        `;
        const checkValues = [bookingId];
        const client = await pool.connect();
        const checkResult = await client.query(checkQuery, checkValues);
        if (checkResult.rows.length === 0) {
            client.release();
            return res.status(404).json({ error: 'Booking not found' });
        }

        // If the booking exists, proceed with deletion
        const deleteQuery = `
            DELETE FROM bookings
            WHERE id = $1;
        `;
        const deleteValues = [bookingId];
        await client.query(deleteQuery, deleteValues);
        client.release();
        res.status(204).json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const query = `
            SELECT * FROM bookings
            WHERE id = $1;
        `;
        const values = [bookingId];
        const client = await pool.connect();
        const result = await client.query(query, values);
        const bookings = result.rows;
        res.status(200).json({ success: true, data: bookings });
        client.release();
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getBookingById, createBooking, getAllBookingAdmin, getBookingByUserID, deleteBooking, deleteBookingAdmin, updateBooking, updateBookingAdmin }

