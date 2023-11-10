import axios from 'axios';

// Define the base URLs for each microservice
const clinicBaseUrl = 'http://localhost:8001';
const patientBaseUrl = 'http://localhost:8002';
const pharmacyBaseUrl = 'http://localhost:8003';
const authenticationBaseUrl = 'http://localhost:8004';

export const clinicAxios = axios.create({
    baseURL: clinicBaseUrl,
    withCredentials: true,
});

export const patientAxios = axios.create({
    baseURL: patientBaseUrl,
    withCredentials: true,
});

export const pharmacyAxios = axios.create({
    baseURL: pharmacyBaseUrl,
    withCredentials: true,
});

export const AuthenticationAxios = axios.create({
    baseURL: authenticationBaseUrl,
    withCredentials: true,
});
