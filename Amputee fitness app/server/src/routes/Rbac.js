const { getEmail } = require('../utils/sessionData');
const express = require('express');
const router = express.Router();

const initializePool = require('../utils/Pool');

router.get('/getByEmailwithPermission/:email', async (req, res) => {
 try{
    const email = req.params.email;

    const pool = await initializePool();
    if (!email) {
        return res.status(400).json({ error: "Email parameter is missing." });
    }

    const query = `
    SELECT DISTINCT p.PermissionName
    FROM Users u
    JOIN UserRole ur ON u.UserId = ur.UserId
    JOIN Role r ON ur.RoleId = r.RoleId
    JOIN RolePermission rp ON r.RoleId = rp.RoleId
    JOIN Permission p ON rp.PermissionId = p.PermissionId
    WHERE u.Email = $1;
    `;

    const result = await pool.query(query, [email]);
    return res.status(200).json({ permissions: result.rows });
    } catch (error) {
        console.error('Error querying the database', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/hasPermission/:permission', async (req, res) => {
try{
        const { permission } = req.params;
        const pool = await initializePool();
        const email = await getEmail(req, res);
        //console.log("FITNESSPRO: permission: " + JSON.stringify(permission));

        const query = `
        SELECT 1
        FROM Users u
        JOIN UserRole ur ON u.UserId = ur.UserId
        JOIN Role r ON ur.RoleId = r.RoleId
        JOIN RolePermission rp ON r.RoleId = rp.RoleId
        JOIN Permission p ON rp.PermissionId = p.PermissionId
        WHERE u.Email = $1 AND p.Permissionid = $2
        LIMIT 1;
        `;
        const result = await pool.query(query, [email, permission]);

        if (result.rows.length > 0) {
            return res.status(200).json({ hasPermission: true });
        } else {
            return res.status(200).json({ hasPermission: false });
        }

    } catch (error) {
        console.error('Error querying the database', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/role-permissions-for-meeting/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await initializePool();        
        const email = await getEmail(req, res);
        //console.log("FITNESSPRO: role-permissions-for-meeting: " + JSON.stringify(req.params) + " " + email);
        const queryText = 'SELECT * FROM get_role_permissions_for_meeting($1, $2)';

        const result = await pool.query(queryText, [email, id]);

       //console.log("FITNESSPRO: role-permissions-for-meeting: data" + JSON.stringify(result.rows));

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Internal server error.');  
    }
});

module.exports = router;
