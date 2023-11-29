import {
    Typography,
    Button
} from '@mui/material';
import Swal from 'sweetalert2';
import '../../../assets/css/swalStyle.css';
import { getDay, getTime } from '../../../utils/DateFormatter.js';

const AppointmentDetails = ({ selectedAppointment, user }) => {
    const handleCancel = async () => {
        console.log('appointment cancelled');
    };
    const handleConfirmation = () => {
        let swalText = '';
        if(user.type == 'patient'){
            swalText += 'The appointment reservation is non-refundable. '; 
        }
        else{ // user.type = 'doctor'
            swalText += 'The patient will be refunded the appointment reservation. ';
        }
        swalText += 'Are you sure you want to cancel this appointment?';
        Swal.fire({
			title: 'Confirm Cancellation',
			text: swalText,
			icon: 'question',
			confirmButtonText: 'Yes',
			showCancelButton: 'true',
			cancelButtonText: 'No',
		}).then(async (result) => {
			if (result['isConfirmed']) {
				await handleCancel();
			}
		});
    };
    let patientFamilyMember, familyMemberText;
    if(selectedAppointment){
        patientFamilyMember = selectedAppointment.patientFamilyMember;
        familyMemberText = (user.type=='patient')? 
            'your family member Mr/Miss ' :
            `Mr/Miss ${selectedAppointment.patientName}'s family member: Mr/Miss `;
    }
    return (
        <>
            {selectedAppointment && (
                <>
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
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant='contained'
                            color='error'
                            sx = {{ marginTop: '3em', width: '25em' }}
                            onClick={handleConfirmation}
                        >
                            Cancel Appointment
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};

export default AppointmentDetails;
