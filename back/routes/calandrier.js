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

pool.query = util.promisify(pool.query);

const app = express();
app.use(cors());

// Create a new event in the calendar
app.post('/add', async (req, res) => {
    try {
        const { nomprenom, email, dateexam, salle, nomexam, typeexam,role,groupe } = req.body;

        const newEvent = {
            nomprenom,
            email,
            dateexam,
            salle,
            nomexam,
            typeexam,role,groupe
        };

        await pool.query('INSERT INTO calandrier SET ?', newEvent);
        res.status(201).json({ message: 'Event added to calendar successfully' });
        console.log("test",nomprenom,email,dateexam,salle,nomexam,typeexam,role,groupe);
    } catch (error) {
        console.error('Error adding event to calendar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update an existing event in the calendar
app.put('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const { nomprenom, email, dateexam, salle, nomexam, typeexam,role,groupe } = req.body;

        const updatedEvent = {
            nomprenom,
            email,
            dateexam,
            salle,
            nomexam,
            typeexam,role,groupe
        };

        await pool.query('UPDATE calandrier SET ? WHERE id = ?', [updatedEvent, eventId]);
        res.status(200).json({ message: 'Event updated in calendar successfully' });
    } catch (error) {
        console.error('Error updating event in calendar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete an event from the calendar
app.delete('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;

        await pool.query('DELETE FROM calandrier WHERE id = ?', eventId);
        res.status(200).json({ message: 'Event deleted from calendar successfully' });
    } catch (error) {
        console.error('Error deleting event from calendar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve all events from the calendar
app.get('/all', async (req, res) => {
    try {
        const events = await pool.query('SELECT * FROM calandrier');
        res.json({ status: 1, data: events });
    } catch (error) {
        console.error('Error fetching all events from calendar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve a specific event from the calendar by id
// Retrieve a specific event from the calendar by id

app.get('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;

        // Validate eventId
        if (!eventId) {
            return res.status(400).json({ message: 'Event ID is required' });
        }

        const [eventRows] = await pool.query('SELECT * FROM calandrier WHERE id = ?', [eventId]);

        // Check if event exists
        if (!eventRows || eventRows.length === 0) {
            return res.status(404).json({ message: 'Calendar not found' });
        }

        const event = eventRows[0];
        console.log(eventRows);
        res.status(200).json(eventRows);
    } catch (error) {
        console.error('Error fetching calendar:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = app;
