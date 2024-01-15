//@ts-nocheck
import * as Api from './Api';

const customizationSettingsURL = '/customization_settings';

export const getCustomizationSettings = (userId:any, config) => Api.get(`${customizationSettingsURL}/${userId}`, config);
export const createCustomizationSetting = (data:any, config) => Api.post(customizationSettingsURL, data, config);
export const updateCustomizationSetting = (settingId:any, data:any, config) => Api.put(`${customizationSettingsURL}/${settingId}`, data, config);
export const deleteCustomizationSetting = (settingId:any, config) => Api.remove(`${customizationSettingsURL}/${settingId}`, config);
