//@ts-nocheck
import * as Api from './Api';
const progressTrackingURL = '/progress_tracking';

export const getProgressTracking = (userId, config) => Api.get(`${progressTrackingURL}/${userId}`, config);
export const createProgressTracking = (data, config) => Api.post(`${progressTrackingURL}`, data, config);
export const updateProgressTracking = (progressId, data, config) => Api.put(`${progressTrackingURL}/${progressId}`, data, config);
export const deleteProgressTracking = (progressId, config) => Api.remove(`${progressTrackingURL}/${progressId}`, config);
