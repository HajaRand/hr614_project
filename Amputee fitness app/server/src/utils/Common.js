const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const cookieParser = require('cookie-parser');

const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const uuid = require('uuid').v4;
  
const sessionStore = new session.MemoryStore();

async function getSessionSecret() {
    let sessionSecret;

    if (process.env.NODE_ENV === 'azure') {
        // //Use the DefaultAzureCredential when the app is deployed to Azure
        const credential = new DefaultAzureCredential();
        const vaultName = process.env.KEYVAULT_NAME;
        const url = `https://${vaultName}.vault.azure.net`;

        const client = new SecretClient(url, credential);

        // This function asynchronously gets the secret from Key Vault
        async function getSecret(secretName) {
            const secret = await client.getSecret(secretName);
            console.log("FITNESSPRO: configureApp ", secretName, secret);
            return secret.value; 
        }

        sessionSecret = await getSecret('SESSION');

    } else {
        sessionSecret = process.env.SESSION;
    }
    console.log("FITNESSPRO: SessionSecret:", sessionSecret);
    return sessionSecret;
}

async function configureApp (checkJwt) {

    domain = process.env.CLIENT_ORIGIN_URL;

    //console.log("FITNESSPRO: Commonjs: ", domain, JSON.stringify(checkJwt));
    const sessionSecret = await getSessionSecret();

    const sessionMiddleware = session({
        genid: (req) => {
            return uuid();
        },
        store: sessionStore,
        name: 'session',
        //domain: domain,
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: '/api/v1',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: (process.env.NODE_ENV === 'azure') ? true : false,
            secure:  (process.env.NODE_ENV === 'azure') ? true : false, // set to true if you are using HTTPS
            sameSite: (process.env.NODE_ENV === 'azure') ? 'none' : 'Lax'
        }
    });

    const app = express();

    // Common middleware and configurations
    app.use(express.json());
    app.use(cookieParser()); 
    app.use(cors({
        credentials: true, // this allows session cookies to be sent and received across origins
        origin: domain // specify the UI's origin
        //methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(checkJwt);
    app.use(sessionMiddleware);
    app.set('trust proxy', 1)
    return app;
}

module.exports = configureApp;



