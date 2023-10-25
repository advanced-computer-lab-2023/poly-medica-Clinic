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



const DoctorDetails = ({ selectedDoctor, handleDialogClose, loggedInPatient }) => {
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
                    <DialogTitle align='center' variant='h2' sx={{ marginBottom:'1em' }}>
                        {`Dr. ${selectedDoctor.userData.name}`}
                    </DialogTitle>

                    <DialogContent>
                        <DoctorDetailsHeader selectedDoctor={selectedDoctor} />
                        <DoctorDetailsAppointmentsList
                            selectedDoctor={selectedDoctor}
                            loggedInPatient={loggedInPatient}
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
