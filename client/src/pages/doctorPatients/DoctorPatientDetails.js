import { Typography, Button } from '@mui/material';
import DoctorIcon from '../../assets/images/icons/DoctorIcon.png';
import EmailIcon from '@mui/icons-material/Email';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import WcIcon from '@mui/icons-material/Wc';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import { useNavigate } from 'react-router';
import { getDay } from '../../utils/DateFormatter.js';

const DoctorPatientDetails = ({ selectedPatient }) => {
    const navigate = useNavigate();
    let title = '';
    if(selectedPatient){
        title = (selectedPatient.gender=='MALE')? 'Mr.':'Miss.';
    }
    return (
        <>
            {
                selectedPatient &&
                (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginBottom: '5em',
                            }}
                        >
                            <div>
                                <img
                                    src={DoctorIcon}
                                    alt={`${title} ${selectedPatient.name}`}
                                    width='100'
                                    height='100'
                                />
                                <Typography variant='h4' sx={{ marginTop: '1em' }}>
                                    {`${title} ${selectedPatient.name}`}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7em' }}>
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <EmailIcon style={{ marginRight: '0.4em' }}/>
                                    <Typography variant='body1'>
                                        {`${selectedPatient.email}`}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <PregnantWomanIcon style={{ marginRight: '0.4em' }}/>
                                    <Typography variant='body1'>
                                        {`Born on ${getDay(selectedPatient.dateOfBirth)}`}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <WcIcon style={{ marginRight: '0.4em' }}/>
                                    <Typography variant='body1'>
                                        {`${selectedPatient.gender}`}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <PhoneIcon style={{ marginRight: '0.4em' }}/>
                                    <Typography variant='body1'>
                                        {`${selectedPatient.mobileNumber}`}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <ContactEmergencyIcon style={{ marginRight: '0.4em' }}/>
                                    <Typography variant='body1'>
                                        {`${selectedPatient.emergencyContact.name} - ${selectedPatient.emergencyContact.mobile}`}
                                    </Typography>
                                </div>
                            </div>

                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant='outlined' sx={{ marginTop: '2%' }} onClick={() => { navigate(`/doctor/pages/profile/${selectedPatient._id}`); }}>
                                View Pofile
                            </Button>

                            <Button variant='outlined' sx={{ marginTop: '2%', marginLeft: '5%' }} onClick={() => { navigate(`/doctor/pages/patients/${selectedPatient._id}/prescriptions`); }}>
                                View Prescriptions
                            </Button>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default DoctorPatientDetails;