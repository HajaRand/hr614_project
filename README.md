# Introduction
This is a proof of concept for the fitness application for lower limb amputee individuals. 

# Technologies
The following tools were used in this project:
- [Expo](https://expo.io/)
- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

# Requirements
Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [React](https://pt-br.reactjs.org/) and [Node](https://nodejs.org/en/) installed.

# Clone this project
$git clone https://github.com/{{YOUR_GITHUB_USERNAME}}/hr614_project

# Access
$cd hr614_project
$cd .\Amputee fitness app\

# Install dependencies
Open a terminal in the server directory

$cd server

$npm install

Open a terminal in the client directory

$cd client

$npm install

# Install Database

$Install PostgreSQL 15 Database Server 

Default username: 'postgres'

Default password: 'admin'

Alternatively update the Username and Password in the the databaseConfig.json file in the server directory

$Create a Database called 'AmputeesPro'

Open Query on the Database and create a schema by running 'Database Creation.sql' found in server/SQL

Add reference data by running the 'Reference Data Template.sql' found in sever/SQL

# Run the project

Open a terminal in the client directory

$cd server

$node server.js

The server will start at <http://localhost:3000>

Open a terminal in the client directory

$cd client

$npm run dev

The UI will open in the browser

# Features
The key features and functionalities of your project:

Feature 1
Login and logout

Feature 2
Create user

Feature 3
Exercise Library

# Credentials
**Microsoft Azure**

https://azure.microsoft.com/en-us/get-started/azure-portal

Email: pakamisaMicro@outlook.com

Password: Grey220022@

**Azure DevOps**

https://azure.microsoft.com/en-gb/products/devops

Click on Start Free

Email: pakamisaMicro@outlook.com

Password: Grey220022@

**Auth0 by Okta**

https://auth0.com/

Click on Continue with Microsoft Account

Email: pakamisaMicro@outlook.com

Password: Grey220022@

**Fitness Pro**

https://fitnessproclient.azurewebsites.net/

Sign Up  or Continue with Google

**Note**
You would not normally add the .env files and databaseConfig.json to source control as a best practice but it was done here to simply the process of getting the application to run.

# Contact
Haja Randrianarisoa – hr614@bath.ac.uk

Project Link: https://github.com/HajaRand/hr614_project/tree/main
