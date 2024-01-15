const GetUserInfo = require('./UserInfo');
const initializePool = require('../utils/Pool');

async function getEmail(req, res) {
    console.log("FITNESSPRO: SessionManager");
    if (req && req.session) {
        console.log("FITNESSPRO: SessionManager - SessionId: ", req.sessionID, req.cookies);

        if (req.session.email !== undefined) {
            return req.session.email;
        } else {
            const data = await GetUserInfo(req, res);
            console.log("FITNESSPRO: SessionManager - getMail: " + JSON.stringify(data));
            req.session.email = data.email;
            return req.session.email;
        }
    }
    else { 
        console.log("FITNESSPRO: SessionManager: session not found");
        return null;
    }
}

function setEmail(req, res, email) {
    if (req && req.session) {
        //console.log("FITNESSPRO: SessionManager - SessionId: ", req.sessionID, req.cookies);
        req.session.email = email;
        //console.log("FITNESSPRO: SessionManager - setMail: " + JSON.stringify(req.session.email));
    } else {
        console.log("FITNESSPRO: SessionManager - setMail: session not found");
    }
}

async function getUserId(req, res) {
    //console.log("FITNESSPRO: SessionManager");
    if (req && req.session) {
        console.log("FITNESSPRO: SessionManager - getUserId - SessionId: ", req.sessionID, req.cookies);

        const email = await getEmail(req, res);

        console.log("getUserId:", email)

        try {
            const pool = await initializePool();
            
            // Fetch all addresses from the database
            const responce = await pool.query('SELECT userid FROM users WHERE email = $1', [email]);

            console.log("UserId", JSON.stringify(responce.rows[0]))
            return responce.rows[0].userid;

        } catch (error) {
            console.error('Error fetching addresses:', error);
            res.status(500).json({ error: 'An error occurred while fetching addresses' });
        }
    }
    else { 
        console.log("FITNESSPRO: SessionManager: session not found");
        return null;
    }
}

module.exports = {
    getEmail,
    setEmail,
    getUserId
};
