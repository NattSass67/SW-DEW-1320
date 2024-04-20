const fs = require('fs');
const { Pool } = require('pg');

require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};


// Read SQL file contents
const initQuery = fs.readFileSync('./config/sql/init.sql', 'utf8');


// Create a PostgreSQL pool
const pool = new Pool(dbConfig);

async function initDB() {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Run initialization queries for each table
    await client.query(initQuery);

    console.log('Database initialized successfully');

    // Release the database client
    client.release();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Call the initDB function
initDB();
