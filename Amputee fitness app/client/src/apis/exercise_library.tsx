//@ts-nocheck
import * as Api from './Api';

const exerciseLibraryURL = '/exercise_library';

export const getExercises = (config) => Api.get(exerciseLibraryURL, config);
export const createExercise = (data, config) => Api.post(exerciseLibraryURL, data, config);
export const updateExercise = (exerciseId, data, config) => Api.put(`${exerciseLibraryURL}/${exerciseId}`, data, config);
export const deleteExercise = (exerciseId, config) => Api.remove(`${exerciseLibraryURL}/${exerciseId}`, config);
