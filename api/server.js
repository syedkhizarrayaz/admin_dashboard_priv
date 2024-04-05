// server.js

const express = require('express');
const mysql = require('mysql2/promise'); // Import mysql2/promise
const cors = require('cors'); // Import the cors middleware
require('dotenv').config({path:'../.env'});

const app = express();
const port = 3001;
// Enable CORS for all requests
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;
const staticUsername = process.env.STATIC_USERNAME;
const staticPassword = process.env.STATIC_PASSWORD;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Endpoint to fetch users from the database
app.get('/api/users', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update user data in the database
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { virus_total, the_phish, sms_whatsapp_phishing } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.execute('UPDATE users SET virus_total=?, the_phish=?, sms_whatsapp_phishing=? WHERE id=?', [virus_total, the_phish, sms_whatsapp_phishing, id]);
        connection.release();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log(staticUsername, staticPassword)
        // Perform validation against database or static credentials
        if (username === staticUsername && password === staticPassword) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Function to update user data based on payment date
async function updateUserStatus() {
    try {
        const connection = await pool.getConnection();
        // Get today's date
        const today = new Date().toISOString().split('T')[0];
        
        // Calculate one year ago from today
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const oneYearAgoDate = oneYearAgo.toISOString().split('T')[0];

        // Update users whose payment_date is one year older than today's date
        const [result] = await connection.execute(
            'UPDATE users SET the_phish = 0, virus_total = 0, sms_whatsapp_phishing = 0 WHERE payment_date <= ? AND payment_date <= ?',
            [today, oneYearAgoDate]
        );
        connection.release();

        console.log(`Updated ${result.affectedRows} user(s)`);
    } catch (error) {
        console.error('Error updating user status:', error.message);
    }
}

// Run updateUserStatus every day (24 hours)
setInterval(updateUserStatus, 24 * 60 * 60 * 1000); // 24 hours in milliseconds


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
