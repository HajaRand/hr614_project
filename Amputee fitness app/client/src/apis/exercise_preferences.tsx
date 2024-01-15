//@ts-nocheck
import * as Api from './Api';

const exercisePreferencesURL = '/exercise_preferences';

export const getExercisePreferences = (config) => Api.get(`${exercisePreferencesURL}`, config);
export const createExercisePreference = (data, config) => Api.post(exercisePreferencesURL, data, config);
export const updateExercisePreference = (data, config) => Api.put(`${exercisePreferencesURL}`, data, config);
export const deleteExercisePreference = (config) => Api.remove(`${exercisePreferencesURL}`, config);
