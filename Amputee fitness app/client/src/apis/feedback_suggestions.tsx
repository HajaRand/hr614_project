//@ts-nocheck
import * as Api from './Api';

const feedbackSuggestionsURL = '/feedback_suggestions';

export const getFeedback = (userId, config) => Api.get(`${feedbackSuggestionsURL}/${userId}`, config);
export const createFeedback = (data, config) => Api.post(feedbackSuggestionsURL, data, config);
export const updateFeedback = (feedbackId, data, config) => Api.put(`${feedbackSuggestionsURL}/${feedbackId}`, data, config);
export const deleteFeedback = (feedbackId, config) => Api.remove(`${feedbackSuggestionsURL}/${feedbackId}`, config);
