import React from 'react';
import { List } from '@mui/material';
import AppointmentCard from './AppointmentCard.js';

const AppointmentList = ({ appointments, setSelectedAppointment }) => {
    return (
        <List>
            {Array.isArray(appointments) &&
                appointments.map((appointment, index) => (
                    <div key={index}>
                        <div key={index}>
                            <AppointmentCard
                                appointment={appointment}
                                setSelectedAppointment={setSelectedAppointment}
                            ></AppointmentCard>
                        </div>
                    </div>
                ))}
        </List>
    );
};

export default AppointmentList;