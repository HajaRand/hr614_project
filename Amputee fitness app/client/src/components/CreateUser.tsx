//@ts-nocheck
import { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { createUser }  from '../apis/User'; 
import { createUserProfile } from '../apis/user_profile'; 

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { createExercisePreference } from '../apis/exercise_preferences'; 
import { createWorkoutSession } from '../apis/workout_sessions'; 
import { createCustomizationSetting } from '../apis/customization_settings';  
import { createProgressTracking } from '../apis/progress_tracking';
import { createSocialInteraction } from '../apis/social_interaction';
import { createDataPrivacySetting } from '../apis/data_privacy_security';

const CreateUserForm = () => {

    const { getAccessTokenSilently } = useAuth0();

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    const [userProfileDetails, setUserProfileDetails] = useState({
        prostheticInfo: '',
        createDate: new Date().toISOString().slice(0, 10), // Default to today's date
    });

    const handleUserChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleUserProfileChange = (e) => {
        setUserProfileDetails({ ...userProfileDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = await getAccessTokenSilently();
            const config = { headers: { Authorization: `Bearer ${token}`} };
        
            console.log("Create User", JSON.stringify(userDetails));
            const response = await createUser(userDetails, config);

            const userId = response.data.userid;
            console.log("Create User:userId", JSON.stringify(userId));

            // Update userProfileDetails with userId
            const updatedUserProfileDetails = {
                ...userProfileDetails,
                userId: userId
            };

            // Create User Profile
            console.log("createUserProfile", JSON.stringify(updatedUserProfileDetails));
            await createUserProfile({ ...updatedUserProfileDetails }, config);


            // Update userProfileDetails with userId
            const blank = {
                userId: userId
            };

            await createExercisePreference( blank, config);
            await createWorkoutSession( blank, config);
            await createCustomizationSetting( blank, config);
            await createProgressTracking( blank, config);
            await createSocialInteraction( blank, config);
            await createDataPrivacySetting( blank, config);

            // Reset form
            setUserDetails({
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            });
            setUserProfileDetails({
                prostheticInfo: '',
                createDate: new Date().toISOString().slice(0, 10)
            });

            alert('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Create User</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        name="firstName"
                        value={userDetails.firstName}
                        onChange={handleUserChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        name="lastName"
                        value={userDetails.lastName}
                        onChange={handleUserChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={userDetails.email}
                        onChange={handleUserChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleUserChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Prosthetic Information"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        name="prostheticInfo"
                        value={userProfileDetails.prostheticInfo}
                        onChange={handleUserProfileChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Create User
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateUserForm;
