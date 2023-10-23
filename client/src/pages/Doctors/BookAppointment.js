import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';


const BookAppointment = ({ selectedDoctor, selectedAppointmentIdx, handleDialogClose }) => {
    console.log('here at BookAppointment.js');
    return (
        <Dialog
            open={selectedAppointmentIdx}
            onClose={handleDialogClose}
            PaperProps={{
                sx: { minWidth: window.outerWidth > 800 ? 500 : 300 },
            }}
        >
            {selectedDoctor && selectedAppointmentIdx && (
                <>
                    <DialogTitle align='center' variant='h2' sx={{ marginBottom:'1em' }}>
                        {selectedAppointmentIdx.index}
                    </DialogTitle>

                    <DialogContent>
                        {selectedAppointmentIdx.index}
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

export default BookAppointment;
