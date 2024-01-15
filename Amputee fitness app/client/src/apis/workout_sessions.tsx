//@ts-nocheck
import * as Api from './Api';

const workoutSessionsURL = '/workout_sessions';

export const getWorkoutSessions = (userId, config) => Api.get(`${workoutSessionsURL}/${userId}`, config);
export const createWorkoutSession = (data, config) => Api.post(`${workoutSessionsURL}`, data, config);
export const updateWorkoutSession = (sessionId, data, config) => Api.put(`${workoutSessionsURL}/${sessionId}`, data, config);
export const deleteWorkoutSession = (sessionId, config) => Api.remove(`${workoutSessionsURL}/${sessionId}`, config);
