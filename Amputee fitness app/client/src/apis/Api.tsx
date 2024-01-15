//@ts-nocheck
import axios from 'axios';
const audienceUri = import.meta.env.VITE_APP_AUTH0_AUDIENCE;

const BASE_URL = `${audienceUri}/api/v1`; // Replace with your API URL
const defaultConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
};

const instance = axios.create({
    baseURL: BASE_URL,
});

// Generic function to make GET requests
export const get = async (resource, config ) => {
    const response = await instance.get(resource, { ...defaultConfig, ...config });
    return response;
};

// Generic function to make POST requests
export const post = async (resource, data, config ) => {
    const response = await instance.post(resource, data, { ...defaultConfig, ...config });
    return response;
};

// Generic function to make PUT requests
export const put = async (resource, data, config ) => {
    const response = await instance.put(resource, data, { ...defaultConfig, ...config });
    return response;
};

// Generic function to make PATCH requests
export const patch = async (resource, data, config ) => {
    const response = await instance.patch(resource, data, { ...defaultConfig, ...config });
    return response;
};

// Generic function to make DELETE requests
export const remove = async (resource, config ) => {
    const response = await instance.delete(resource, { ...defaultConfig, ...config });
    return response;
};
