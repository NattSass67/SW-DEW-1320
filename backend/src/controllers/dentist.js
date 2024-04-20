
const pool = require('../db/database');

// Create
const createDentist = async (req, res) => {
    const { name, experience, expertise } = req.body;
    try {
        const client = await pool.connect();
        const query = `
            INSERT INTO dentists (name, experience, expertise)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [name, experience, expertise];
        const result = await client.query(query, values);
        res.status(201).json(result.rows[0]);
        client.release();
    } catch (error) {
        console.error('Error creating dentist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Read all dentists
const getAllDentists = async (req, res) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM dentists';
        const result = await client.query(query);
        res.status(200).json({success:true,data:result.rows});
        client.release();
    } catch (error) {
        console.error('Error fetching dentists:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Read dentist by ID
const getDentistById = async (req, res) => {
    const id = req.params.id;
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM dentists WHERE id = $1';
        const result = await client.query(query, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Dentist not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
        client.release();
    } catch (error) {
        console.error('Error fetching dentist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update
const updateDentist = async (req, res) => {
    const id = req.params.id;
    const { name, experience, expertise } = req.body;
    try {
        const client = await pool.connect();
        const query = `
            UPDATE dentists
            SET name = $1, experience = $2, expertise = $3
            WHERE id = $4
            RETURNING *;
        `;
        const values = [name, experience, expertise, id];
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Dentist not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
        client.release();
    } catch (error) {
        console.error('Error updating dentist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete
const deleteDentist = async (req, res) => {
    const id = req.params.id;
    try {
        const client = await pool.connect();
        const query = 'DELETE FROM dentists WHERE id = $1';
        const result = await client.query(query, [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Dentist not found' });
        } else {
            res.status(204).json({ success: true, message: 'Dentist deleted successfully' });
        }
        client.release();
    } catch (error) {
        console.error('Error deleting dentist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createDentist, getAllDentists, getDentistById, updateDentist, deleteDentist };
