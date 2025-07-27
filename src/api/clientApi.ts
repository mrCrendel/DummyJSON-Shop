import { StorageKey } from '@/constants/storage';
import axios, {InternalAxiosRequestConfig} from 'axios';
import Cookies from 'js-cookie';
import {authAPI} from "@/api/index";

export const clientAPI = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

const doRefreshToken = async (refreshToken: string, originalRequest: InternalAxiosRequestConfig) => {
    try {
        const response = await authAPI.refresh(refreshToken);

        Cookies.set(StorageKey.REFRESH_TOKEN, response.data.refreshToken);
        Cookies.set(StorageKey.ACCESS_TOKEN, response.data.accessToken);

        return clientAPI(originalRequest);
    } catch (error) {
        return Promise.reject(error);
    }
}

clientAPI.interceptors.request.use((config) => {
    const token = Cookies.get(StorageKey.ACCESS_TOKEN);
    if (token) config.headers!['Authorization'] = `Bearer ${token}`;
    return config;
});

clientAPI.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const refreshToken = Cookies.get(StorageKey.REFRESH_TOKEN);

        if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
            originalRequest._retry = true;

            return doRefreshToken(refreshToken, originalRequest);
        }
        return Promise.reject(error);
    }
);
export default clientAPI;
