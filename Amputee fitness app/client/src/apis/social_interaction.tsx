//@ts-nocheck
import * as Api from './Api';

const socialInteractionURL = '/social_interaction';

export const getSocialInteractions = (userId, config) => Api.get(`${socialInteractionURL}/${userId}`, config);
export const createSocialInteraction = (data, config) => Api.post(socialInteractionURL, data, config);
export const updateSocialInteraction = (interactionId, data, config) => Api.put(`${socialInteractionURL}/${interactionId}`, data, config);
export const deleteSocialInteraction = (interactionId, config) => Api.remove(`${socialInteractionURL}/${interactionId}`, config);
