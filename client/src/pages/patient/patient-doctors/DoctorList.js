import React from 'react';
import { List } from '@mui/material';
import DoctorCard from './DoctorCard.js';
import { useDoctorContext } from 'hooks/useDoctorContext.js';
const DoctorList = () => {
    const { doctors } = useDoctorContext();
    return (
        <List>
            {Array.isArray(doctors) &&
                doctors.map((doctor, index) => (
                    <div key={index}>
                        <div key={index}>
                            <DoctorCard
                                doctor={doctor}
                            ></DoctorCard>
                        </div>
                    </div>
                ))}
        </List>
    );
};

export default DoctorList;
