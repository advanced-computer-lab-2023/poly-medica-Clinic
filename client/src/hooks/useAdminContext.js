
import { AdminContext } from '../contexts/AdminContext';
import { useContext } from 'react';

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    return context;
};