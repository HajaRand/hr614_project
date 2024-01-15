//@ts-nocheck

import * as Api from './Api';

export const getAllUsers  = (config) => Api.get('users', config);
//export const getByEmail = (id, config) => Api.get(`address/${id}`, config);
//export const getByEmailwithPermission = (id, config) => Api.get(`address/${id}`, config);
export const createUser  = (data, config) => Api.post('users', data, config);
//export const update = (id, data, config) => Api.put(`address/${id}`, data, config);
//export const remove = (data, config) => Api.post('address', data, config);

