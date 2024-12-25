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

// Create table query for Plan
const createPlanTableQuery = `
    CREATE TABLE IF NOT EXISTS plan (
        idplan INT AUTO_INCREMENT PRIMARY KEY,
        diplome VARCHAR(255),
        nomplan VARCHAR(255),
        anneeapp INT,
        spec VARCHAR(255)
    )
`;

pool.query(createPlanTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table 'plan' created successfully");
});

// POST endpoint to add a new plan
app.post('/add', async (req, res) => {
    try {
        const { diplome, nomplan, anneeapp, spec } = req.body;
        const insertQuery = 'INSERT INTO plan (diplome, nomplan, anneeapp, spec) VALUES (?, ?, ?, ?)';
        const result = await pool.query(insertQuery, [diplome, nomplan, anneeapp, spec]);
        const insertedPlanId = result.insertId;
        res.status(201).json({ message: 'Plan added successfully', idplan: insertedPlanId });
    } catch (error) {
        console.error('Error adding plan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET endpoint to fetch all plans
app.get('/all', async (req, res) => {
    try {
        const sql = 'SELECT * FROM plan';
        const plans = await pool.query(sql);
        res.status(200).json(plans);
    } catch (error) {
        console.error('Error fetching plans:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET endpoint to fetch a plan by ID
app.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM plan WHERE idplan = ?';
        const [plan] = await pool.query(sql, [id]);
        if (!plan || plan.length === 0) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.status(200).json(plan);
    } catch (error) {
        console.error('Error fetching plan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT endpoint to update a plan
app.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { diplome, nomplan, anneeapp, spec } = req.body;
        const updatedPlan = { diplome, nomplan, anneeapp, spec };
        await pool.query('UPDATE plan SET ? WHERE idplan = ?', [updatedPlan, id]);
        res.status(200).json({ message: 'Plan updated successfully' });
    } catch (error) {
        console.error('Error updating plan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE endpoint to delete a plan
app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM plan WHERE idplan = ?', [id]);
        res.status(200).json({ message: 'Plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting plan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// GET endpoint to fetch plans by diplome
// GET endpoint to fetch nomdiplome from diplome
// GET endpoint to fetch nomdiplome from diplome




module.exports = app;
