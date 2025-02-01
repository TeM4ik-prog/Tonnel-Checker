import axios from "axios";
import { getTokenFromLocalStorage } from "@/utils/localstorage";

// URL для твоего бэкенда на Vercel
const API_URL = "https://backend-tem4ik-prog-tem4ik-progs-projects.vercel.app";  

export const createAxiosInstance = (basePath: string) => {
    const instance = axios.create({
        baseURL: `/api/${basePath}`, // Полный путь с базовым URL
        headers: {
            Authorization: 'Bearer ' + (getTokenFromLocalStorage() || '')
        }
    });

    instance.interceptors.request.use(
        config => {
            const token = getTokenFromLocalStorage();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    return instance;
};
