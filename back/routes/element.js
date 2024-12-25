const express = require('express');
const util = require('util');
const mysql = require('mysql');
const cors = require('cors');

require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Your database password
    database: 'mypfe'
});

pool.query = util.promisify(pool.query);

const app = express();
app.use(cors());
app.use(express.json());

// Create table query for Element
const createElementTableQuery = `
    CREATE TABLE IF NOT EXISTS element (
        idelement INT AUTO_INCREMENT PRIMARY KEY,
        matier1 VARCHAR(255),
        matier2 VARCHAR(255),
        matier3 VARCHAR(255),
        coffmatier1 FLOAT,
        coffmatier2 FLOAT,
        coffmatier3 FLOAT,
        regime1 VARCHAR(255),
        regime2 VARCHAR(255),
        regime3 VARCHAR(255),
        idunite INT,
        FOREIGN KEY (idunite) REFERENCES unit(idunite) ON DELETE CASCADE
    )
`;

pool.query(createElementTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table 'element' created successfully");
});

// POST endpoint to add an element to a unit
app.post('/add', async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const { matier1, matier2, matier3, coffmatier1, coffmatier2, coffmatier3, regime1, regime2, regime3, idunite } = req.body;

        // Check if all required fields are present and have valid values
        if (!matier1 || !matier2 || !matier3 || !coffmatier1 || !coffmatier2 || !coffmatier3 || !regime1 || !regime2 || !regime3 || idunite === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Fetch the unit to ensure it exists
        const unitQuery = 'SELECT idunite FROM unit WHERE idunite = ?';
        const [unit] = await pool.query(unitQuery, [idunite]);
        if (!unit || unit.length === 0) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        const insertQuery = 'INSERT INTO element (matier1, matier2, matier3, coffmatier1, coffmatier2, coffmatier3, regime1, regime2, regime3, idunite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await pool.query(insertQuery, [matier1, matier2, matier3, coffmatier1, coffmatier2, coffmatier3, regime1, regime2, regime3, idunite]);
        res.status(201).json({ message: 'Element added successfully' });
    } catch (error) {
        console.error('Error adding element:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET endpoint to fetch all elements associated with a unit
app.get('/elements/:idunite', async (req, res) => {
    try {
        const idunite = req.params.idunite;
        const sql = 'SELECT * FROM element WHERE idunite = ?';
        const elements = await pool.query(sql, [idunite]);
        res.status(200).json(elements);
    } catch (error) {
        console.error('Error fetching elements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET endpoint to fetch an element by ID
app.get('/:id', async (req, res) => {
    try {
        const idelement = req.params.id;
        const sql = 'SELECT * FROM element WHERE idelement = ?';
        const [element] = await pool.query(sql, [idelement]);
        if (!element || element.length === 0) {
            return res.status(404).json({ message: 'Element not found' });
        }
        res.status(200).json(element);
    } catch (error) {
        console.error('Error fetching element:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT endpoint to update an element
app.put('/:id', async (req, res) => {
    try {
        const idelement = req.params.id;
        const { matier1, matier2, matier3, coffmatier1, coffmatier2, coffmatier3, regime1, regime2, regime3 } = req.body;

        const updatedElement = {
            matier1,
            matier2,
            matier3,
            coffmatier1,
            coffmatier2,
            coffmatier3,
            regime1,
            regime2,
            regime3
        };

        await pool.query('UPDATE element SET ? WHERE idelement = ?', [updatedElement, idelement]);
        res.status(200).json({ message: 'Element updated successfully' });
    } catch (error) {
        console.error('Error updating element:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE endpoint to delete an element
app.delete('/:id', async (req, res) => {
    try {
        const idelement = req.params.id;
        await pool.query('DELETE FROM element WHERE idelement = ?', idelement);
        res.status(200).json({ message: 'Element deleted successfully' });
    } catch (error) {
        console.error('Error deleting element:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/element/:idunite', async (req, res) => {
    try {
        const idunite = req.params.idunite;
        const sql = 'SELECT * FROM element WHERE idunite = ?';
        const elements = await pool.query(sql, [idunite]);
        res.status(200).json(elements);
    } catch (error) {
        console.error('Error fetching elements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/:idelement', async (req, res) => {
    try {
        const idelement = req.params.idelement;
        const sql = 'SELECT * FROM element WHERE idelement = ?';
        const elements = await pool.query(sql, [idelement]);
        res.status(200).json(elements);
    } catch (error) {
        console.error('Error fetching elements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;
