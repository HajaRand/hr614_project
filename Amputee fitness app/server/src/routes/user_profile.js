const express = require('express');
const router = express.Router();
const initializePool = require('../utils/Pool');

router.post('/', async (req, res) => {
    try {
        const { userId, prostheticInfo, createDate, lastLoginDate } = req.body;

        const pool = await initializePool();
        const newUserProfile = await pool.query(
            'INSERT INTO user_profile (UserId, prosthetic_info, create_date, last_login_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, prostheticInfo, createDate, lastLoginDate]
        );
        res.json(newUserProfile.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await initializePool();
        const userProfile = await pool.query('SELECT * FROM user_profile WHERE UserId = $1', [id]);
        res.json(userProfile.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { prostheticInfo, lastLoginDate } = req.body;

        const pool = await initializePool();
        const updateUserProfile = await pool.query(
            'UPDATE user_profile SET prosthetic_info = $1, last_login_date = $2 WHERE UserId = $3 RETURNING *',
            [prostheticInfo, lastLoginDate, id]
        );
        res.json(updateUserProfile.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await initializePool();
        await pool.query('DELETE FROM user_profile WHERE UserId = $1', [id]);
        res.json('User profile was deleted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
