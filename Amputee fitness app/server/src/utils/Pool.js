const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const { Pool } = require("pg");

let pool = null;
let poolPromise;

async function createPool() {

  if (process.env.NODE_ENV === 'azure') {
      //Use the DefaultAzureCredential when the app is deployed to Azure
      const credential = new DefaultAzureCredential();
      const vaultName = process.env.KEYVAULT_NAME;
      const url = `https://${vaultName}.vault.azure.net`;
    
      const client = new SecretClient(url, credential);
    
      // This function asynchronously gets the secret from Key Vault
      async function getSecret(secretName) {
        const secret = await client.getSecret(secretName);
        return secret.value;
      }
      
      // Fetch all secrets and wait for them to be resolved
      const [user, host, database, password] = await Promise.all([
        getSecret(`DB-USER`),
        getSecret(`DB-HOST`),
        getSecret(`DB-NAME`),
        getSecret(`DB-PASSWORD`)
      ]);
    
      // Load your secrets from Key Vault and initialize your application config
      async function loadConfigFromKeyVault() {
          return( {
                  "user": user,
                  "host": host,
                  "database": database,
                  "password": password,
                  "port": 5432,
                  "ssl": "true"
          })
        } 

        const dbConfig = await loadConfigFromKeyVault();

        console.log("FITNESSPRO: Database Azure: ", JSON.stringify(dbConfig));

       pool =  new Pool(dbConfig);

      } else {
        const dbConfig =  require('../../databaseConfig.json').database;

        //console.log("FITNESSPRO: Database env: ", JSON.stringify(dbConfig));

        pool =  new Pool(dbConfig);
    }

    return pool;
  }

  function initializePool() {
    if (!pool) {
        if (!poolPromise) {
            poolPromise = createPool();
        }
        pool = poolPromise.then(p => {
            pool = p;
            return p;
        });
    }
    return pool;
}

module.exports = initializePool;