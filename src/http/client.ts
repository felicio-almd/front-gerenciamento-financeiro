import axios from "axios";

export const authClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});


export const authenticatedClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    timeout: 10000,    
    headers: {'Accept': 'application/json'},
    withCredentials: true
});

