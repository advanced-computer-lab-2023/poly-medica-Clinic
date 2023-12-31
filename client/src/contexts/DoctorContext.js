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
    const [appointments, setAppointments] = useState([]);
    const [loggedInDoctor, setLoggedInDoctor] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [originalDoctors, setOriginalDoctors] = useState([]);

    const contextValue = {
        doctors, setDoctors, isLoading, setIsLoading, confirmDeleteDialogOpen, setConfirmDeleteDialogOpen, setSelectedTime,
        doctorToDelete, setDoctorToDelete, doctorIsBeingDeleted, setDoctorIsBeingDeleted, doctorDeleted, selectedTime, setOriginalDoctors,
        setDoctorDeleted, errorMessage, setErrorMessage, availableSlots, setAvailableSlots, selectedDate, setSelectedDate,
        appointments, setAppointments, loggedInDoctor, setLoggedInDoctor, selectedDoctor, setSelectedDoctor, originalDoctors
    };

    return (
        <DoctorContext.Provider value={contextValue}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorProvider;