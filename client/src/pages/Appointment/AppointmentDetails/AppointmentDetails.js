import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
} from '@mui/material';
import { getDay, getTime } from '../../../utils/DateFormatter.js';

const AppointmentDetails = ({ selectedAppointment, handleDialogClose, user }) => {
    let patientFamilyMember, familyMemberText;
    if(selectedAppointment){
        patientFamilyMember = selectedAppointment.patientFamilyMember;
        familyMemberText = (user.type=='patient')? 
            'your family member Mr/Miss ' :
            `Mr/Miss ${selectedAppointment.patientName}'s family member: Mr/Miss `;
    }
    console.log(selectedAppointment);
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
                    <DialogTitle align='center' variant='h2' sx={{ marginBottom: '1em' }}>
                        Appointment
                    </DialogTitle>
                    <DialogContent>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5em' }}>
                            {
                                user.type=='patient' 
                                &&
                                <>
                                    <Typography variant='h4' >
                                        {`Dr. ${selectedAppointment.doctorName}`}
                                    </Typography>
                                </>
                            }
                            {
                                user.type=='doctor' 
                                &&
                                <>
                                    <Typography variant='h4'>
                                        {`Mr/Miss ${selectedAppointment.patientName}`}
                                    </Typography>
                                </>
                            }
                        </div>
                        <Typography variant='subtitle1'>Date:</Typography>
                        <Typography variant='body1'>
                            {`${getDay(selectedAppointment.date)} at ${getTime(selectedAppointment.date)}`}
                        </Typography>
                        <Typography variant='subtitle1'>Status:</Typography>
                        <Typography variant='body1'>
                            {selectedAppointment.status}
                        </Typography>
                        <Typography variant='subtitle1'>Type:</Typography>
                        <Typography variant='body1'>
                            {selectedAppointment.type}
                        </Typography>
                        {  
                            patientFamilyMember
                            &&
                            <>
                                <Typography variant='subtitle1'>Notes:</Typography>
                                <Typography variant='body1'>
                                    {`This appointment is for ${familyMemberText} ${patientFamilyMember.name}`}
                                </Typography>
                            </>
                        }
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
