import React from 'react';
import { List } from '@mui/material';
import AppointmentCard from './AppointmentCard.js';

const AppointmentList = ({ appointments, setSelectedAppointment }) => {
    const isRunningAppointment = (selectedAppointment) => {
        const currentDate = new Date();
        const appointmentDate = new Date(selectedAppointment.date);
        const oneHourLater = new Date(appointmentDate.getTime() + 60 * 60 * 1000);
        return currentDate >= appointmentDate && currentDate <= oneHourLater;
    };
    return (
        <List>
            {Array.isArray(appointments) &&
                appointments.map((appointment, index) => (
                    <div key={index}>
                        <div key={index}>
                            <AppointmentCard
                                appointment={appointment}
                                setSelectedAppointment={setSelectedAppointment}
                                isRunning={isRunningAppointment(appointment)}
                            ></AppointmentCard>
                        </div>
                    </div>
                ))}
        </List>
    );
};

export default AppointmentList;
