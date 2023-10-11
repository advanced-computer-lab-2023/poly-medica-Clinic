import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
} from '@mui/material';
// import { DateField } from '@mui/x-date-pickers/DateField';
import DoctorIcon from '../../assets/images/icons/DoctorIcon.png';

const DoctorDetails = ({ selectedDoctor, handleDialogClose }) => {
    return (
        <Dialog
            open={selectedDoctor}
            onClose={handleDialogClose}
            PaperProps={{
                sx: { minWidth: window.outerWidth > 800 ? 500 : 300 },
            }}
        >
            {selectedDoctor && (
                <>
                    <DialogTitle align='center' variant='h2'>
                        {selectedDoctor.name}
                    </DialogTitle>
                    <DialogContent>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <img
                                src={DoctorIcon}
                                alt={selectedDoctor.userData.name}
                                width='100'
                                height='100'
                            />
                        </div>
                        <Typography variant='subtitle1'>Name:</Typography>
                        <Typography variant='body1'>
                            {selectedDoctor.userData.name}
                        </Typography>
                        <Typography variant='subtitle1'>Speciality:</Typography>
                        <Typography variant='body1'>
                            {selectedDoctor.speciality}
                        </Typography>
                        <Typography variant='subtitle1'>
                            Affiliation:
                        </Typography>
                        <Typography variant='body1'>
                            {selectedDoctor.affiliation}
                        </Typography>
                        <Typography variant='subtitle1'>
                            Educational Background:
                        </Typography>
                        <Typography variant='body1'>
                            {selectedDoctor.educationalBackground}
                        </Typography>
                        <Typography variant='subtitle1'>
                            Hourly Price:
                        </Typography>{' '}
                        {/* need user id to get discount */}
                        <Typography variant='body1'>
                            ${selectedDoctor.hourlyRate}
                        </Typography>
                        <Typography variant='subtitle1'>
                            Available Slots:
                        </Typography>
                        {/* we need to view available slots properly */}
                        <Typography variant='body1'>
                            {selectedDoctor.availableSlots.toString()}
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

export default DoctorDetails;
