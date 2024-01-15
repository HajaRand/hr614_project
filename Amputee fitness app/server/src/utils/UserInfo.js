const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const axios = require('axios');

let domain;

async function GetUserInfo(req, res) {

    if (process.env.NODE_ENV === 'azure') {
        //Use the DefaultAzureCredential when the app is deployed to Azure
        const credential = new DefaultAzureCredential();
        const vaultName = process.env.KEYVAULT_NAME;
        const url = `https://${vaultName}.vault.azure.net`;

        const client = new SecretClient(url, credential);

        // This function asynchronously gets the secret from Key Vault
        async function getSecret(secretName) {
            const secret = await client.getSecret(secretName);
            console.log("FITNESSPRO: GetUserInfo ", secretName, secret);
        return secret.value; 
        }

        domain = await getSecret('AUTH0-DOMAIN');

      } else {
        domain   = process.env.AUTH0_DOMAIN;
      }

      //console.log("FITNESSPRO: GetUserInfo - domain:", domain);

    // Define the API URL you want to call
    const apiUrl = `https://${domain}/UserInfo`;
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        // Split the header value to separate "Bearer" from the token
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {

            const token = parts[1];
            //console.log('Extracted Token:', token);

            const headers = { Authorization: `Bearer ${token}` }

            try {
                //console.log("FITNESSPRO: UserInfo:url ", apiUrl);
                const response = await axios.get(apiUrl, { headers });
                console.log("FITNESSPRO: UserInfo: SessionId: ", req.sessionID);
                //console.log("FITNESSPRO: UserInfo:email ", response.data);
                return response.data;  // Return the data from the API
            } catch (error) {
                console.error('API Error:', error);
                throw error;  // If there's an error, it will be caught by the caller
            }
        }
    }
}

module.exports = GetUserInfo;