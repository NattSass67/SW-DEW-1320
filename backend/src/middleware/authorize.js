const jwt = require('jsonwebtoken');
const pool = require('../db/database');

const protect = async (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
 try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Manually acquire a client from the pool
        const client = await pool.connect();

        // Execute the query to fetch user data
        const query = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await client.query(query, [decoded.id]);

        // Release the client back to the pool
        client.release();

        // If user data is not found, return unauthorized
        if (!rows || rows.length === 0) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Attach the user object to the request
        req.user = rows[0];
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

const authorizeAdmin = async (req,res,next)=>{
    if(req.user.is_admin){
        next();
    }else{
        return res.status(403).json({ success: false, message: `Not authorized to access this route` });
    }
}

module.exports = {protect ,authorizeAdmin};
