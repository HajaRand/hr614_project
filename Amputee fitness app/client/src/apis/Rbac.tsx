//@ts-nocheck
import * as Api from './Api';

export const callback = (config) => Api.get('callback', config);
export const meetingPermission = (id, config) => Api.get(`user/role-permissions-for-meeting/${id}`, config);
export const hasPermission = (hasPermission, config) => Api.get(`user/hasPermission/${hasPermission}`, config);