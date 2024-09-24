// src/utils/apiClient.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
// import { BASE_URL } from '../config/constants';

const BASE_URL = 'https://api.sparklin.ai/api';

const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        // Handle specific error codes here
        switch (error.response.status) {
          case 401:
            // Handle unauthorized
            break;
          case 403:
            // Handle forbidden
            break;
          // Add more cases as needed
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiClient = createApiClient();
