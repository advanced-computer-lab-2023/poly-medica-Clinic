import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import DoctorDetailsHeader from './DoctorDetailsHeader.js';
import DoctorDetailsAppointmentsList from './DoctorDetailsAppointmentsList.js';
import { usePatientContext } from 'hooks/usePatientContext.js';
import { useDoctorContext } from 'hooks/useDoctorContext.js';
const DoctorDetails = () => {

    const { loggedInPatient, loggedInPatientHealthPackage } = usePatientContext();
    const { selectedDoctor, setSelectedDoctor } = useDoctorContext();

    const handleDialogClose = () => {
        setSelectedDoctor(null);
    };

    return (
        <Dialog
            open={selectedDoctor}
            onClose={handleDialogClose}
            PaperProps={{
                sx: { minWidth: window.outerWidth > 800 ? 700 : 500 },
            }}
        >
            {selectedDoctor && (
                <>
                    <DialogTitle align='center' variant='h2' sx={{ marginBottom: '1em' }}>
                        {`Dr. ${selectedDoctor.userData.name}`}
                    </DialogTitle>

                    <DialogContent>
                        <DoctorDetailsHeader
                            selectedDoctor={selectedDoctor}
                            loggedInPatientHealthPackage={loggedInPatientHealthPackage}
                        />
                        <DoctorDetailsAppointmentsList
                            selectedDoctor={selectedDoctor}
                            loggedInPatient={loggedInPatient}
                            loggedInPatientHealthPackage={loggedInPatientHealthPackage}
                        />
                    </DialogContent>


                    <DialogActions>
                        <Button onClick={handleDialogClose} color='primary'>
                            Close
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default DoctorDetails;
