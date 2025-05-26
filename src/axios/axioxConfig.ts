import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authenticationAPi, BASE_URL, baseUrl } from '../store/urls';

const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Define toast mixin
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});

const setupInterceptors = (navigate: NavigateFunction) => {
    apiClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    apiClient.interceptors.response.use(
        (response: AxiosResponse) => {
            const data = response.data;

            if ((response.status === 200 || response.status === 201) && data?.message) {
                
                Toast.fire({
                    icon: 'success',
                    title: data.message,
                });
            }

            return response;
        },
        (error: AxiosError<any>) => {
            if (error.response) {
                const { status, data } = error.response;

                switch (status) {
                    case 401:
                        Toast.fire({
                            icon: 'warning',
                            title: 'Unauthorized. Redirecting...',
                        });
                        navigate('/auth/boxed-signin');
                        break;

                    case 400:
                        Toast.fire({
                            icon: 'error',
                            title: data?.message || 'Bad request.',
                        });
                        break;

                    case 500:
                        Toast.fire({
                            icon: 'error',
                            title: 'Internal Server Error.',
                        });
                        break;

                    default:
                        Toast.fire({
                            icon: 'error',
                            title: data?.message || `Error: ${status}`,
                        });
                        break;
                }
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Network error or unexpected issue.',
                });
            }

            return Promise.reject(error);
        }
    );
};

export { apiClient, setupInterceptors };
