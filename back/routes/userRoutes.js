const express = require('express');
const jwt = require('jsonwebtoken');
const util = require('util');
const mysql = require('mysql');
const cors = require('cors');

require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Provide your database password here if you have one
    database: 'mypfe'
});

// Promisify pool.query
pool.query = util.promisify(pool.query);

const app = express();
app.use(cors());

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const { nom,prenom, email, password, role,cin } = req.body;

        const newUser = {
            nom,prenom,
            email,
            password,
            role,cin
        };

        await pool.query('INSERT INTO users SET ?', newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Authenticate user and generate JWT token
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Query the database to fetch user with the provided email and password
        const [userRows] = await pool.query('SELECT id, email, role FROM users WHERE email = ? AND password = ?', [email, password]);
      
        // Check if user exists
        if (!userRows || userRows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = userRows[0]; // Assuming there's only one user with the given email and password

        // Generate JWT token
        const token = jwt.sign({ userId: userRows.id, email: userRows.email, role: userRows.role }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token expires in 1 hour
        });

        res.status(200).json({ token, role: userRows.role });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





app.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { nom,prenom, email, password, role,cin } = req.body;

        const updatedUser = {
            nom,prenom,
            email,
            password,
            role,cin
        };

        await pool.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId]);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete user by ID
app.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        await pool.query('DELETE FROM users WHERE id = ?', userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Get all users
app.get('/all', async (req, res) => {
    const sql = `SELECT * FROM users`;

    pool.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      res.json({ status: 1, data: results });
    });
});


// Get user by ID
app.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Use array destructuring to extract the result rows
        const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      
        // Check if user exists
        if (!userRows || userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userRows[0];
        res.status(200).json(userRows);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





module.exports = app;
