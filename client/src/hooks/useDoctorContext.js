
import { DoctorContext } from '../contexts/DoctorContext';
import { useContext } from 'react';

export const useDoctorContext = () => {
    const context = useContext(DoctorContext);
    return context;
};