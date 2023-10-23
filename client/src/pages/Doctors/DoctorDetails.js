import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import DoctorDetailsHeader from './DoctorDetailsHeader.js';
import DoctorDetailsAppointments from './DoctorDetailsAppointments.js';



const DoctorDetails = ({ selectedDoctor, handleDialogClose }) => {
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
                        <DoctorDetailsAppointments selectedDoctor={selectedDoctor} />
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
