const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/database');

const register = async (req, res) => {
    try {
        const { name, telephone, email, password } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = await pool.connect();
        const query = 'INSERT INTO users (name, telephone, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, telephone, email, hashedPassword];
        const result = await client.query(query, values);
        const user = result.rows[0];
        res.status(200).json({
            success: true, user: {
                id: user.id,
                name: user.name,
                email: user.email,
                telephone: user.telephone
            }
        });
        client.release();
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error', msg: error.detail });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const client = await pool.connect();
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];
        // Compare hashed password with provided password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        res.status(200).json({ success: true, token, id: user.id, name: user.name, email: user.email });

        client.release();
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal Server Error', msg: error.detail });
    }
};



module.exports = { register, login };