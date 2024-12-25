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

// Create table query for Unit
const createUnitTableQuery = `
    CREATE TABLE IF NOT EXISTS unit (
        idunite INT AUTO_INCREMENT PRIMARY KEY,
        nomunite VARCHAR(255),
        idplan INT,
        FOREIGN KEY (idplan) REFERENCES plan(idplan) ON DELETE CASCADE
    )
`;

pool.query(createUnitTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table 'unit' created successfully");
});

// POST endpoint to add a new unit to a plan
app.post('/add', async (req, res) => {
    try {
        const { nomunite, idplan } = req.body;

        // Your logic to add the unit...

        const insertQuery = 'INSERT INTO unit (nomunite, idplan) VALUES (?, ?)';
        const result = await pool.query(insertQuery, [nomunite, idplan]);

        // After inserting, return the idunite in the response
        const idunite = result.insertId;
        res.status(201).json({ message: 'Unit added successfully', idunite });
    } catch (error) {
        console.error('Error adding unit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET endpoint to fetch all units
app.get('/all', async (req, res) => {
    try {
        const sql = 'SELECT * FROM unit';
        const units = await pool.query(sql);
        res.status(200).json(units);
    } catch (error) {
        console.error('Error fetching units:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET endpoint to fetch a unit by ID
app.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM unit WHERE idunite = ?';
        const [unit] = await pool.query(sql, [id]);
        if (!unit || unit.length === 0) {
            return res.status(404).json({ message: 'Unit not found' });
        }
        res.status(200).json(unit);
    } catch (error) {
        console.error('Error fetching unit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT endpoint to update a unit
app.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nomunite } = req.body;

        const updatedUnit = { nomunite };

        await pool.query('UPDATE unit SET ? WHERE idunite = ?', [updatedUnit, id]);
        res.status(200).json({ message: 'Unit updated successfully' });
    } catch (error) {
        console.error('Error updating unit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE endpoint to delete a unit
app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM unit WHERE idunite = ?', [id]);
        res.status(200).json({ message: 'Unit deleted successfully' });
    } catch (error) {
        console.error('Error deleting unit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// GET endpoint to fetch all units by plan ID
app.get('/unite/:idplan', async (req, res) => {
    try {
        const idplan = req.params.idplan;
        const sql = 'SELECT * FROM unit WHERE idplan = ?';
        const units = await pool.query(sql, [idplan]);
        res.status(200).json(units);
    } catch (error) {
        console.error('Error fetching units by plan ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = app;
