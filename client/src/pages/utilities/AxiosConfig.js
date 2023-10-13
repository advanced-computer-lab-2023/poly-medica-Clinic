import axios from 'axios';
import {
    CLINIC_BASE_URL,
    PATIENT_BASE_URL,
    PHARMACY_BASE_URL,
} from '../../utils/Constants.js';

// Define the base URLs for each microservice

export const clinicAxios = axios.create({
    baseURL: CLINIC_BASE_URL,
    withCredentials: true,
});

export const patientAxios = axios.create({
    baseURL: PATIENT_BASE_URL,
    withCredentials: true,
});

export const pharmacyAxios = axios.create({
    baseURL: PHARMACY_BASE_URL,
    withCredentials: true,
});

export const doctorAxios = axios.create({
    baseURL: CLINIC_BASE_URL,
    withCredentials: true,
});
