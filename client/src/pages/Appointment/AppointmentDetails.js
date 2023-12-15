import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
} from '@mui/material';
import { getDay, getTime } from '../../utils/DateFormatter.js';
import { useNavigate } from 'react-router-dom';
import { DOCTOR_TYPE_ENUM, PATIENT_TYPE_ENUM } from '../../utils/Constants.js';
import { VideoContext } from '../../contexts/VideoChatContext.js';
import { useContext } from 'react';

const AppointmentDetails = ({ selectedAppointment, handleDialogClose, user }) => {

    const navigate = useNavigate();
    const { answerCall, call, callAccepted, socket } = useContext(VideoContext);
    let patientFamilyMember, familyMemberText;

    if (selectedAppointment) {
        socket.emit('join_room', selectedAppointment.doctorId);
        console.log('call = ', call);
        patientFamilyMember = selectedAppointment.patientFamilyMember;
        familyMemberText = (user.type == 'patient') ?
            'your family member Mr/Miss ' :
            `Mr/Miss ${selectedAppointment.patientName}'s family member: Mr/Miss `;
    }

    const handleAttendAppointment = () => {
        console.log('inside func');
        navigate(`/${user.type}/pages/video-chat/${user.type === DOCTOR_TYPE_ENUM ?
            selectedAppointment.patientId : selectedAppointment.doctorId}`);

        if (user.type === DOCTOR_TYPE_ENUM) {
            answerCall(selectedAppointment.patientId);
        }
    };
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
                                user.type == 'patient'
                                &&
                                <>
                                    <Typography variant='h4' >
                                        {`Dr. ${selectedAppointment.doctorName}`}
                                    </Typography>
                                </>
                            }
                            {
                                user.type == 'doctor'
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
                        {(user.type === PATIENT_TYPE_ENUM || (call.isReceivedCall && !callAccepted)) &&
                            <Button onClick={() => handleAttendAppointment()}>
                                Attend Appointment
                            </Button>
                        }
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
