const express = require('express');
const router = express.Router();

//const checkJwt = require('../utils/CheckJwt');
const initializePool = require('../utils/Pool');

// Get all addresses (requires authentication)
router.get('/', async (req, res) => {
    try {
        const pool = await initializePool();
        
        // Fetch all addresses from the database
        const addresses = await pool.query('SELECT * FROM address');
        res.json(addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching addresses' });
    }

});

// Get an address by ID (requires authentication)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await initializePool();
        console.log("FITNESSPRO: Get Address by id" + JSON.stringify(req.params));

        // Fetch the address by ID from the database
        const address = await pool.query('SELECT * FROM address WHERE addressId = $1', [id]);

        res.json(address);
    } catch (error) {
        console.error('Error fetching address by ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching the address' });
    }
});

// Create a new address (requires authentication)
router.post('/', async (req, res) => {
    try {
        const { addressLine, addressLine2, city, province, postcode, country } = req.body;

        const pool = await initializePool();

        const insertQuery = `
        INSERT INTO address (addressLine, addressLine2, city, province, postcode, country)
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING addressid;
         `;

        const values = [addressLine, addressLine2, city, province, postcode, country];
        const result = await pool.query(insertQuery, values);
            
        console.log("FITNESSPRO: post results" + JSON.stringify(result.rows[0]));

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating address:', error);
        res.status(500).json({ error: 'An error occurred while creating the address' });
    }
});

// Update an address by ID (requires authentication)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { addressLine, addressLine2, city, province, postcode, country } = req.body;

        const pool = await initializePool();

        // Update the address in the database
        const updatedAddress = await pool.query(
            'UPDATE address SET addressLine = $1, addressLine2 = $2, city = $3, province = $4, postcode = $5, country = $6 WHERE addressId = $7 RETURNING *',
            [addressLine, addressLine2, city, province, postcode, country, id]
        );

        res.json(updatedAddress);
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ error: 'An error occurred while updating the address' });
    }
});

// Delete an address by ID (requires authentication)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await initializePool();

        // Delete the address from the database
        await pool.query('DELETE FROM address WHERE addressId = $1', [id]);

        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ error: 'An error occurred while deleting the address' });
    }
});

module.exports = router;
