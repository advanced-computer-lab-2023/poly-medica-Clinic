
import { PatientContext } from '../contexts/PatientContext';
import { useContext } from 'react';

export const usePatientContext = () => {
    const context = useContext(PatientContext);
    return context;
};