// groupe.js

const express = require('express');
const mysql = require('mysql');
const util = require('util');
const cors = require('cors');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Provide your database password here if you have one
    database: 'mypfe'
});

pool.query = util.promisify(pool.query);

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Create a new groupe
app.post('/add', async (req, res) => {
    try {
        const { nomprenom, email, specialite, nbgroupe } = req.body;

        const newGroupe = {
            nomprenom,
            email,
            specialite,
            nbgroupe
        };

        await pool.query('INSERT INTO groupe SET ?', newGroupe);
        res.status(201).json({ message: 'Groupe registered successfully' });
    } catch (error) {
        console.error('Error registering groupe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update an existing groupe
app.put('/:id', async (req, res) => {
    try {
        const groupId = req.params.id;
        const { nomprenom, email, specialite, nbgroupe } = req.body;

        const updatedGroupe = {
            nomprenom,
            email,
            specialite,
            nbgroupe
        };

        await pool.query('UPDATE groupe SET ? WHERE id = ?', [updatedGroupe, groupId]);
        res.status(200).json({ message: 'Groupe updated successfully' });
    } catch (error) {
        console.error('Error updating groupe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete an existing groupe
app.delete('/:id', async (req, res) => {
    try {
        const groupId = req.params.id;

        await pool.query('DELETE FROM groupe WHERE id = ?', groupId);
        res.status(200).json({ message: 'Groupe deleted successfully' });
    } catch (error) {
        console.error('Error deleting groupe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve all groupes
app.get('/all', async (req, res) => {
    try {
        const sql = 'SELECT * FROM groupe';
        const groupes = await pool.query(sql);
        res.json({ status: 1, data: groupes });
    } catch (error) {
        console.error('Error fetching all groupes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve a groupe by id
app.get('/:id', async (req, res) => {
    try {
        const groupId = req.params.id;

        const [groupeRows] = await pool.query('SELECT * FROM groupe WHERE id = ?', [groupId]);
      
        if (!groupeRows || groupeRows.length === 0) {
            return res.status(404).json({ message: 'Groupe not found' });
        }

        const groupe = groupeRows[0];
        res.status(200).json(groupeRows);
    } catch (error) {
        console.error('Error fetching groupe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;
