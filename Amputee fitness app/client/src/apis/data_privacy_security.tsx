//@ts-nocheck
import * as Api from './Api';

const dataPrivacySecurityURL = '/data_privacy_security';

export const getDataPrivacySettings = (userId,config) => Api.get(`${dataPrivacySecurityURL}/${userId}`, config);
export const createDataPrivacySetting = (data, config) => Api.post(dataPrivacySecurityURL, data, config);
export const updateDataPrivacySetting = (privacyId, data, config) => Api.put(`${dataPrivacySecurityURL}/${privacyId}`, data, config);
export const deleteDataPrivacySetting = (privacyId, config) => Api.remove(`${dataPrivacySecurityURL}/${privacyId}`, config);
