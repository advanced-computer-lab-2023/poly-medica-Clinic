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
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);   
    const [patients, setPatients] = useState([]);
	const [originalPatients, setOriginalPatients] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [loggedInDoctor, setLoggedInDoctor] = useState(null);
	const [selectedPatient, setSelectedPatient] = useState(null);
    
    const contextValue = {
        doctors, setDoctors, isLoading, setIsLoading, confirmDeleteDialogOpen, setConfirmDeleteDialogOpen, setSelectedTime,
        doctorToDelete, setDoctorToDelete, doctorIsBeingDeleted, setDoctorIsBeingDeleted, doctorDeleted, selectedTime,
        setDoctorDeleted, errorMessage, setErrorMessage, availableSlots, setAvailableSlots, selectedDate, setSelectedDate,
        patients, setPatients, originalPatients, setOriginalPatients, appointments, setAppointments, loggedInDoctor, setLoggedInDoctor,
        selectedPatient, setSelectedPatient
    };

    return (
        <DoctorContext.Provider value={contextValue}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorProvider;