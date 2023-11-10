import React from 'react';
import { List } from '@mui/material';
import DoctorCard from './DoctorCard.js';

const DoctorList = ({ doctors, setSelectedDoctor, loggedInPatientHealthPackage }) => {
    return (
        <List>
            {Array.isArray(doctors) &&
                doctors.map((doctor, index) => (
                    <div key={index}>
                        <div key={index}>
                            <DoctorCard
                                doctor={doctor}
                                setSelectedDoctor={setSelectedDoctor}
                                loggedInPatientHealthPackage={loggedInPatientHealthPackage}
                            ></DoctorCard>
                        </div>
                    </div>
                ))}
        </List>
    );
};

export default DoctorList;
