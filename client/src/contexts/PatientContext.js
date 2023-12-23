import { createContext, useState } from 'react';

export const PatientContext = createContext();

const PatientProvider = ({ children }) => {

    const [patients, setPatients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [patientToDelete, setPatientToDelete] = useState(null);
	const [patientIsBeingDeleted, setPatientIsBeingDeleted] = useState(false);
	const [patientDeleted, setPatientDeleted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [selectedPatient, setSelectedPatient] = useState(null);
    
    const contextValue = {
        patients, setPatients, isLoading, setIsLoading, confirmDeleteDialogOpen, setConfirmDeleteDialogOpen, patientToDelete, setPatientToDelete,
        patientIsBeingDeleted, setPatientIsBeingDeleted, patientDeleted, setPatientDeleted, errorMessage, setErrorMessage, selectedPatient,
        setSelectedPatient
    };

    return (
        <PatientContext.Provider value={contextValue}>
            {children}
        </PatientContext.Provider>
    );
};

export default PatientProvider;