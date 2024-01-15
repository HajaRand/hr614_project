//@ts-nocheck

import React, {useState, useEffect} from 'react';
import { FormControl, InputLabel, Select, MenuItem, Slider, Typography, Button, Grid } from '@mui/material';

import { getExercisePreferences } from '../apis/exercise_preferences'; // Import the PUT method from your axios setup
import { updateExercisePreference } from '../apis/exercise_preferences'; // Import the PUT method from your axios setup

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export default function ExercisePreferencesForm() {
  const [exerciseType, setExerciseType] = React.useState('');
  const [intensityLevel, setIntensityLevel] = React.useState(5);
  const [duration, setDuration] = React.useState(30);
  const [frequency, setFrequency] = React.useState(3);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { user, isLoading, isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

    // useEffect to call fetchPreferences when the component mounts
    React.useEffect(() => {
      fetchPreferences();
    }, []); // The empty array [] means this effect runs once when the component mounts
  

    useEffect(() => {
      // Check if the component has been initialized
      if (isInitialized) {
        savePreferences(); // Trigger save when any of the state variables change
      } else {
        setIsInitialized(true); // Set the flag to true after the initial fetch
      }
    }, [exerciseType, intensityLevel, duration, frequency, isInitialized]);
  

  const handleExerciseTypeChange = (event) => {
    setExerciseType(event.target.value);
  };

  const handleIntensityLevelChange = (event, newValue) => {
    setIntensityLevel(newValue);
  };

  const handleDurationChange = (event, newValue) => {
    setDuration(newValue);
  };

  const handleFrequencyChange = (event, newValue) => {
    setFrequency(newValue);
  };

  const savePreferences = async () => {

    const token = await getAccessTokenSilently();
    const config = { headers: { Authorization: `Bearer ${token}`} };

    const preferences = {
      exercise_type : exerciseType,
      intensity_level : intensityLevel,
      duration,
      frequency
    };

    updateExercisePreference(preferences, config)
      .then(response => {
        console.log('Preferences saved:', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error('Error saving preferences:', error);
      });
  };

   // Function to fetch user preferences
   const fetchPreferences = async () => {

    const token = await getAccessTokenSilently();
    const config = { headers: { Authorization: `Bearer ${token}`} };

    console.log("exercise-preferences");

    getExercisePreferences(config)
      .then(response => {
        const data = response.data;

        console.log("getExercisePreferences", JSON.stringify(data))
        setExerciseType(data.exercise_type ? data.exercise_type : '');
        setIntensityLevel(data.intensity_level ? data.intensity_level : 1);
        setDuration(data.duration);
        setFrequency(data.frequency);

        console.log("getExercisePreferences", JSON.stringify(data))
      })
      .catch(error => {
        console.error('Error fetching preferences:', error);
      });
  };



  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="exercise-type-label">Exercise Type</InputLabel>
          <Select
            labelId="exercise-type-label"
            id="exercise-type"
            value={exerciseType}
            label="Exercise Type"
            onChange={handleExerciseTypeChange}
          >
            <MenuItem value={'Strength & Endurance'}>Strength & Endurance</MenuItem>
            <MenuItem value={'Coordination & Balance'}>Coordination & Balance</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom>Intensity Level: {intensityLevel}</Typography>
        <Slider
          value={intensityLevel}
          onChange={handleIntensityLevelChange}
          aria-labelledby="intensity-level-slider"
          min={1}
          max={10}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom>Duration (Minutes): {duration}</Typography>
        <Slider
          value={duration}
          onChange={handleDurationChange}
          aria-labelledby="duration-slider"
          min={10}
          max={60}
          marks
          step={10}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom>Frequency (Days per Week): {frequency}</Typography>
        <Slider
          value={frequency}
          onChange={handleFrequencyChange}
          aria-labelledby="frequency-slider"
          min={1}
          max={7}
          marks
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
