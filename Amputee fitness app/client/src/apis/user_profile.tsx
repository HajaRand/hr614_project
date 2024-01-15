//@ts-nocheck

import * as Api from './Api';

export const getAllUserProfile = (config) => Api.get('user_profile', config);
//export const getByEmail = (id, config) => Api.get(`address/${id}`, config);
//export const getByEmailwithPermission = (id, config) => Api.get(`address/${id}`, config);
export const createUserProfile = (data, config) => Api.post('user_profile', data, config);
//export const update = (id, data, config) => Api.put(`address/${id}`, data, config);
//export const remove = (data, config) => Api.post('address', data, config);

