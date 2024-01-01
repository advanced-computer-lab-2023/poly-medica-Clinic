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
import { usePatientContext } from 'hooks/usePatientContext';
import { getTitle } from 'utils/CommonUtils';
import { commonStyles } from 'ui-component/CommonStyles';

const useStyles = styled(() => commonStyles);

const StyledButton = styled(Button)({
    marginTop: '2%',
});

const DoctorPatientDetails = () => {
    const navigate = useNavigate();
    const { selectedPatient } = usePatientContext();
    const title = getTitle(selectedPatient);
    const classes = useStyles();
    return (
        <>
            {selectedPatient && (
                <>
                    <div className={classes.container}>

                        <img src={DoctorIcon} alt={`${title} ${selectedPatient.name}`} width='100' height='100' />
                        <Typography variant='h4' sx={{ marginTop: '1em' }}>
                            {`${title} ${selectedPatient.name}`}
                        </Typography>
                        <div className={classes.infoContainer}>

                            <div className={classes.emailContainer}>
                                <EmailIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`${selectedPatient.email}`}</Typography>
                            </div>
                            <div className={classes.emailContainer}>
                                <PregnantWomanIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`Born on ${getDay(selectedPatient.dateOfBirth)}`}</Typography>
                            </div>
                            <div className={classes.emailContainer}>
                                <WcIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`${selectedPatient.gender}`}</Typography>
                            </div>
                            <div className={classes.emailContainer}>
                                <PhoneIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`${selectedPatient.mobileNumber}`}</Typography>
                            </div>
                            <div className={classes.emailContainer}>
                                <ContactEmergencyIcon sx={{ marginRight: '0.4em' }} />
                                <Typography variant='body1'>{`${selectedPatient.emergencyContact.name} - ${selectedPatient.emergencyContact.mobile}`}</Typography>
                            </div>
                        </div>
                    </div>

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
