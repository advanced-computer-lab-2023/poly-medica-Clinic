import { createContext, useState } from 'react';

export const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {

    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);
    const [doctorIsBeingDeleted, setDoctorIsBeingDeleted] = useState(false);
    const [doctorDeleted, setDoctorDeleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const contextValue = {
        doctors, setDoctors, isLoading, setIsLoading, confirmDeleteDialogOpen, setConfirmDeleteDialogOpen,
        doctorToDelete, setDoctorToDelete, doctorIsBeingDeleted, setDoctorIsBeingDeleted, doctorDeleted,
        setDoctorDeleted, errorMessage, setErrorMessage
    };

    return (
        <DoctorContext.Provider value={contextValue}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorProvider;