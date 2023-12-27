import { createContext, useState } from 'react';

export const PatientContext = createContext();

const PatientProvider = ({ children }) => {

    const [patients, setPatients] = useState([]);
    const [originalPatients, setOriginalPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [patientIsBeingDeleted, setPatientIsBeingDeleted] = useState(false);
    const [patientDeleted, setPatientDeleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loggedInPatient, setLoggedInPatient] = useState(null);
    const [loggedInPatientHealthPackage, setLoggedInPatientHealthPackage] = useState(null);
    const [FamilyMembers, setFamilyMembers] = useState([]);
    const [openPackages, setOpenPackages] = useState(false);
    const [error, setError] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        nationalId: '',
        age: '',
        gender: '',
        relation: '',
        email: '',
        mobileNumber: '',
        id: ''
    });
    const [memberId, setMemberId] = useState(null);
    const contextValue = {
        patients, setPatients, isLoading, setIsLoading, confirmDeleteDialogOpen, setConfirmDeleteDialogOpen, patientToDelete, setPatientToDelete, FamilyMembers,
        patientIsBeingDeleted, setPatientIsBeingDeleted, patientDeleted, setPatientDeleted, errorMessage, setErrorMessage, selectedPatient, setFamilyMembers,
        setSelectedPatient, originalPatients, setOriginalPatients, loggedInPatient, setLoggedInPatient, loggedInPatientHealthPackage,
        openPackages, setOpenPackages, error, setError, newMember, setNewMember, memberId, setMemberId, setLoggedInPatientHealthPackage
    };

    return (
        <PatientContext.Provider value={contextValue}>
            {children}
        </PatientContext.Provider>
    );
};

export default PatientProvider;