const express = require('express');
const router = express.Router();
const initializePool = require('../utils/Pool');

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body;

        console.log("Users: post");

        const pool = await initializePool();
        const newUser = await pool.query(
            'INSERT INTO users (FirstName, LastName, Email, Phone) VALUES ($1, $2, $3, $4) RETURNING *',
            [firstName, lastName, email, phone]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {

        const pool = await initializePool();
        const user = await pool.query('SELECT * FROM users');

        console.log("GetAllusers", JSON.stringify(user.rows))
        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Users: get by Id");

        const pool = await initializePool();
        const user = await pool.query('SELECT * FROM users WHERE UserId = $1', [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone } = req.body;

        const pool = await initializePool();
        const updateUser = await pool.query(
            'UPDATE users SET FirstName = $1, LastName = $2, Email = $3, Phone = $4 WHERE UserId = $5 RETURNING *',
            [firstName, lastName, email, phone, id]
        );
        res.json(updateUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await initializePool();
        await pool.query('DELETE FROM users WHERE UserId = $1', [id]);
        res.json('User was deleted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;