import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
} from '@mui/material';

const AppointmentDetails = ({ selectedAppointment, handleDialogClose }) => {
    return (
        <Dialog
            open={selectedAppointment}
            onClose={handleDialogClose}
            PaperProps={{
                sx: { minWidth: window.outerWidth > 800 ? 500 : 300 },
            }}
        >
            {selectedAppointment && (
                <>
                    <DialogTitle align='center' variant='h2'>
                        Appointment
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant='subtitle1'>
                            Doctor Name:
                        </Typography>
                        <Typography variant='body1'>
                            {selectedAppointment.doctorName}
                        </Typography>
                        <Typography variant='subtitle1'>
                            Patient Name:
                        </Typography>
                        <Typography variant='body1'>
                            {selectedAppointment.patientName}
                        </Typography>
                        <Typography variant='subtitle1'>Date:</Typography>
                        <Typography variant='body1'>
                            {selectedAppointment.date}
                        </Typography>
                        <Typography variant='subtitle1'>Status:</Typography>
                        <Typography variant='body1'>
                            {selectedAppointment.status}
                        </Typography>
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

export default AppointmentDetails;
