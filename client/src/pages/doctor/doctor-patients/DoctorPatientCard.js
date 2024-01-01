import {
    ListItemButton,
    ListItemText,
    ListItemAvatar,
} from '@mui/material';
import DoctorIcon from '../../../assets/images/icons/DoctorIcon.png';
import { usePatientContext } from 'hooks/usePatientContext';
import { getTitle } from 'utils/CommonUtils';
import { commonStyles } from 'ui-component/CommonStyles';
import { styled } from '@mui/system';

const useStyles = styled(() => commonStyles);

const DoctorPatientCard = ({ patient }) => {
    const { setSelectedPatient } = usePatientContext();
    const title = getTitle(patient);
    const classes = useStyles();

    return (
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
                className={classes.ListItemText}
            />
        </ListItemButton>
    );
};

export default DoctorPatientCard;