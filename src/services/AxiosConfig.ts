import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001/api/v1', // Reemplaza con la URL de tu API
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        alert('Se ha producido un error en la solicitud. Por favor, inténtelo de nuevo más tarde.');
        console.error('Error en la solicitud:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    (config) => {
        if (config.method === 'get' && config.params) {
            const filteredParams = Object.fromEntries(
                Object.entries(config.params).filter(([_, value]) => value !== null && value !== undefined)
            );
            config.params = filteredParams;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;
