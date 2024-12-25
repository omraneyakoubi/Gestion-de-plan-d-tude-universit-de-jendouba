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


app.post('/add', async (req, res) => {
    try {
        const { code, nomdiplome, 	niveau, niveauuniv } = req.body;

        const newUser = {
            code,
            nomdiplome,
            niveau,
            niveauuniv
        };

        await pool.query('INSERT INTO diplome SET ?', newUser);
        res.status(201).json({ message: 'diplome registered successfully' });
    } catch (error) {
        console.error('Error registering diplome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { code, nomdiplome, 	niveau, niveauuniv  } = req.body;

        const updatedUser = {
            code,
            nomdiplome,
            niveau,
            niveauuniv
        };

        await pool.query('UPDATE diplome SET ? WHERE id = ?', [updatedUser, userId]);
        res.status(200).json({ message: 'diplome updated successfully' });
    } catch (error) {
        console.error('Error updating diplome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        await pool.query('DELETE FROM diplome WHERE id = ?', userId);
        res.status(200).json({ message: 'diplome deleted successfully' });
    } catch (error) {
        console.error('Error deleting diplome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/all', async (req, res) => {
    const sql = `SELECT * FROM diplome`;

    pool.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      res.json({ status: 1, data: results });
    });
});


app.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Use array destructuring to extract the result rows
        const [userRows] = await pool.query('SELECT * FROM diplome WHERE id = ?', [userId]);
      
        // Check if user exists
        if (!userRows || userRows.length === 0) {
            return res.status(404).json({ message: 'diplome not found' });
        }

        const user = userRows[0];
        res.status(200).json(userRows);
    } catch (error) {
        console.error('Error fetching diplome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// GET endpoint to fetch nomdiplome from diplome
app.get('/diplome/nomdiplome', async (req, res) => {
    try {
        const sql = 'SELECT nomdiplome FROM diplome';
        const result = await pool.query(sql);
        const nomdiplomes = result.map(row => row.nomdiplome); // Extracting nomdiplome values

        console.log("Nomdiplomes:", nomdiplomes); // Add this line for debugging

        res.status(200).json(nomdiplomes);
    } catch (error) {
        console.error('Error fetching nomdiplome from diplome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});






module.exports = app;