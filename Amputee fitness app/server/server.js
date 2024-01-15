const dotenv = require('dotenv');

//Routes
const Address = require('./src/routes/Address');
const Rbac = require('./src/routes/Rbac');

const ExercisePreferences = require('./src/routes/exercise_preferences');
const workoutSessions = require('./src/routes/workout_sessions');
const customizationSettings = require('./src/routes/customization_settings');
const progressTracking = require('./src/routes/progress_tracking');
const socialInteraction = require('./src/routes/social_interaction');
const dataPrivacySecurity = require('./src/routes/data_privacy_security');
const userProfile = require('./src/routes/user_profile');
const user = require('./src/routes/Users');

async function initializeApp() {
    try {
        //Utils
        const configureApp = require('./src/utils/Common');
        const initializecheckJwt = require('./src/utils/CheckJwt');
        const GetUserInfo = require('./src/utils/UserInfo');
        const {setEmail} = require('./src/utils/sessionData');

        const checkJwt =  await initializecheckJwt();
        const app =  await configureApp(checkJwt);
        dotenv.config();

        const port = process.env.PORT || 3000;

        app.get('/', (req, res) => {
            console.log("FITNESSPRO: Session ID: ", req.sessionID, req.cookies);
            res.send('Hello World!')
          })

        // app.get("/api/v1/users", async function (req, res) {
        //     try {
        //         console.log("FITNESSPRO: Session ID - users: ", req.sessionID, req.cookies);
        //         console.log("FITNESSPRO: Session - users: ", JSON.stringify(req.session.user));

        //         res.status(200).json({
        //             status: "success",
        //             data: {
        //                 users: ["John", "Sam", "Bob"],
        //             }
        //         })
        //     } catch (error) {
        //         console.log("FITNESSPRO: callback: ", error);
        //     }
        // });

        app.get("/api/v1/callback", async function (req, res) {
            try {
                const data = await GetUserInfo(req, res);
                console.log("FITNESSPRO: callback: ", req.sessionID, req.cookies);
                setEmail(req, res, data.email);
                res.status(200).json({
                    status: "success",
                })
            } catch (error) {
                console.log("FITNESSPRO: callback", error);
                res.status(200).json({ callback: error });
            }
        });
        

        // // Routes
        app.use('/api/v1/address', Address);
        app.use('/api/v1/user', Rbac);
        app.use('/api/v1/exercise_preferences', ExercisePreferences);
        app.use('/api/v1/workout_sessions', workoutSessions);
        app.use('/api/v1/customization_settings', customizationSettings);
        app.use('/api/v1/progress_tracking', progressTracking);
        app.use('/api/v1/social_interaction', socialInteraction);
        app.use('/api/v1/data_privacy_security', dataPrivacySecurity);

        app.use('/api/v1/user_profile', userProfile);
        app.use('/api/v1/users', user);

        app.listen(port, () => {
            console.log(`FITNESSPRO: Server running on port ${port}`);
        });
     } catch (error) {
         console.error('FITNESSPRO: Failed to initialize app:', error);
     }
}

initializeApp();