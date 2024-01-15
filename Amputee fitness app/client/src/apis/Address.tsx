//@ts-nocheck
import * as Api from './Api';

export const getAll = (config: ApiConfig) => Api.get('address', config);
export const getById = (id, config) => Api.get(`address/${id}`, config);
export const update = (id, data, config: ApiConfig) => Api.put(`address/${id}`, data, config);
export const remove = (id, config: ApiConfig) => Api.remove(`address/${id}`, config);
export const create = (data, config: ApiConfig) => Api.post('address', data, config);

