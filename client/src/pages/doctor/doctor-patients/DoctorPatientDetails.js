import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import DoctorIcon from '../../../assets/images/icons/DoctorIcon.png';
import EmailIcon from '@mui/icons-material/Email';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import WcIcon from '@mui/icons-material/Wc';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import { getDay } from '../../../utils/DateFormatter';
import { useNavigate } from 'react-router-dom';
import { useDoctorContext } from 'hooks/useDoctorContext';
import { getTitle } from 'utils/CommonUtils';
const PatientDetailsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '5em',
});

const PatientInfoContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7em',
});

const IconContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
});

const StyledButton = styled(Button)({
    marginTop: '2%',
});

const DoctorPatientDetails = () => {
    const navigate = useNavigate();
    const { selectedPatient } = useDoctorContext();
    const title = getTitle(selectedPatient);

    return (
        <>
            {selectedPatient && (
                <>
                    <PatientDetailsContainer>
                        <div>
                            <img src={DoctorIcon} alt={`${title} ${selectedPatient.name}`} width='100' height='100' />
                            <Typography variant='h4' sx={{ marginTop: '1em' }}>
                                {`${title} ${selectedPatient.name}`}
                            </Typography>
                        </div>
                        <PatientInfoContainer>
                            <IconContainer>
                                <EmailIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`${selectedPatient.email}`}</Typography>
                            </IconContainer>
                            <IconContainer>
                                <PregnantWomanIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`Born on ${getDay(selectedPatient.dateOfBirth)}`}</Typography>
                            </IconContainer>
                            <IconContainer>
                                <WcIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`${selectedPatient.gender}`}</Typography>
                            </IconContainer>
                            <IconContainer>
                                <PhoneIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`${selectedPatient.mobileNumber}`}</Typography>
                            </IconContainer>
                            <IconContainer>
                                <ContactEmergencyIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`${selectedPatient.emergencyContact.name} - ${selectedPatient.emergencyContact.mobile}`}</Typography>
                            </IconContainer>
                        </PatientInfoContainer>
                    </PatientDetailsContainer>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <StyledButton variant='outlined' onClick={() => navigate(`/doctor/pages/profile/${selectedPatient._id}`, { state: { selectedPatient } })}>
                            View Profile
                        </StyledButton>
                        <StyledButton
                            variant='outlined'
                            sx={{ marginLeft: '5%' }}
                            onClick={() => navigate(`/doctor/pages/my-patients/${selectedPatient._id}/prescriptions`, { state: { selectedPatient } })}
                        >
                            View Prescriptions
                        </StyledButton>
                    </div>
                </>
            )}
        </>
    );
};

export default DoctorPatientDetails;
