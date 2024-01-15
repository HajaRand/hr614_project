const { auth } = require('express-oauth2-jwt-bearer');

const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

let domain;
let audience;
let checkJwt = null;
let checkJwtPromise;

 async function loadcheckJwt() {
  if (process.env.NODE_ENV === 'azure') {
    // //Use the DefaultAzureCredential when the app is deployed to Azure
    const credential = new DefaultAzureCredential();
    const vaultName = process.env.KEYVAULT_NAME;
    const url = `https://${vaultName}.vault.azure.net`;

    const client = new SecretClient(url, credential);

    // This function asynchronously gets the secret from Key Vault
    async function getSecret(secretName) {
      const secret = await client.getSecret(secretName);
      console.log("FITNESSPRO: CheckJwt ", secretName, secret);
      return secret.value; 
    }

    // Fetch all secrets and wait for them to be resolved
     [domain, audience] = await Promise.all([
      getSecret('AUTH0-DOMAIN'),
      getSecret('AUTH0-AUDIENCE')
    ]);
    
    //domain   = 'dev-8anoa8ykr6n3zoa7.uk.auth0.com';
    //audience =  'FITNESSPRO20.azurewebsites.net';

  } else {
    domain   = process.env.AUTH0_DOMAIN;
    audience =  process.env.AUTH0_AUDIENCE;
  }

  // Use config in your application

    //console.log("FITNESSPRO: checkJwt1:", domain, audience);

     const checkJwt = auth({
      audience: `${audience}`,
      issuerBaseURL: `https://${domain}/`,
      tokenSigningAlg: 'RS256'
    });

    //console.log("FITNESSPRO: checkJwt2: ", domain, audience, JSON.stringify(checkJwt));

    return checkJwt;
}

function initializecheckJwt() {
  if (!checkJwt) {
      if (!checkJwtPromise) {
        checkJwtPromise = loadcheckJwt();
      }
      checkJwt = checkJwtPromise.then(p => {
        checkJwt = p;
        //console.log("FITNESSPRO: checkJwt3: ", JSON.stringify(checkJwt));
          return checkJwt;
      });
  }
  return checkJwt;
}

module.exports = initializecheckJwt;
