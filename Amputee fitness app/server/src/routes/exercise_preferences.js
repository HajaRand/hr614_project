const { getUserId } = require('../utils/sessionData');

const express = require('express');
const router = express.Router();

const initializePool = require('../utils/Pool');

// CREATE operation - Add new exercise preference
router.post('/', async (req, res) => {
    try {
        const { userId, exerciseType, intensityLevel, duration, frequency } = req.body;

        const pool = await initializePool();
        const newPreference = await pool.query(
            "INSERT INTO exercise_preferences (UserId, exercise_type, intensity_level, duration, frequency) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [userId, exerciseType, intensityLevel, duration, frequency]
        );
        res.json(newPreference.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// // READ operation - Get all exercise preferences
// router.get('/', async (req, res) => {
//     try {

//         const pool = await initializePool();
//         const allPreferences = await pool.query("SELECT * FROM exercise_preferences");
//         res.json(allPreferences.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// READ operation - Get a single exercise preference by ID
router.get('/', async (req, res) => {
    try {
        console.log("exercise-preferences UserId: ")
        //const { id } = req.params;
        id = await getUserId(req, res);

        console.log("exercise-preferences UserId: ", id)
        const pool = await initializePool();
        const preference = await pool.query("SELECT * FROM exercise_preferences WHERE userid = $1", [id]);
        res.json(preference.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// UPDATE operation - Update an exercise preference
router.put('/', async (req, res) => {
    try {
        //const { id } = req.params;
        const { exercise_type, intensity_level, duration, frequency } = req.body;

        console.log("updateExercisePreference", JSON.stringify(req.body))

        id = await getUserId(req, res);

        console.log("updateExercisePreference:", id, JSON.stringify(req.body));

        const pool = await initializePool();
        const updatePreference = await pool.query(
            "UPDATE exercise_preferences SET exercise_type = $1, intensity_level = $2, duration = $3, frequency = $4 WHERE userid = $5",
            [exercise_type, intensity_level, duration, frequency, id]
        );
        res.json("Exercise preference was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE operation - Delete an exercise preference
router.delete('/', async (req, res) => {
    try {
        id = await getUserId(req, res);

        const pool = await initializePool();
        await pool.query("DELETE FROM exercise_preferences WHERE userid = $1", [id]);
        res.json("Exercise preference was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
