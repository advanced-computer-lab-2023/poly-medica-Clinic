import {
    Typography,
} from '@mui/material';
import { getDay, getTime } from '../../../utils/DateFormatter.js';

const AppointmentDetails = ({ selectedAppointment, user }) => {
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
                </>
            )}
        </>
    );
};

export default AppointmentDetails;
