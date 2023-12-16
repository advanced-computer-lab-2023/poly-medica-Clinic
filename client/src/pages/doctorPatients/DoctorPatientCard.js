import {
    ListItemButton,
    ListItemText,
    ListItemAvatar,
} from '@mui/material';
import DoctorIcon from '../../assets/images/icons/DoctorIcon.png';

const DoctorPatientCard = ({ patient, setSelectedPatient }) => {
    const title = (patient.gender=='MALE')? 'Mr.':'Miss.';
    
    return(
        <ListItemButton onClick={() => setSelectedPatient(patient)}>
            <ListItemAvatar sx={{ paddingRight: '2%' }}>
                <img
                    src={DoctorIcon}
                    alt={patient.name}
                    width='40'
                    height='40'
                />
            </ListItemAvatar>
            <ListItemText
                primary={`${title} ${patient.name}`}
                secondary={patient.email}
                sx={{
                    width: '60%',
                    lineHeight: '1.5em',
                    maxHeight: '3em',
                }}
            />
        </ListItemButton>
    );
};

export default DoctorPatientCard;