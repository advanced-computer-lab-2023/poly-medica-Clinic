import {
    ListItemButton,
    ListItemText,
    ListItemAvatar,
} from '@mui/material';
import { styled } from '@mui/system';
import DoctorIcon from '../../../assets/images/icons/DoctorIcon.png';
import { calcPrice } from '../../../utils/PriceCalculator.js';
import DoctorPrice from './DoctorPrice.js';
import { usePatientContext } from 'hooks/usePatientContext';
import { commonStyles } from 'ui-component/CommonStyles';
import { useDoctorContext } from 'hooks/useDoctorContext';
const useStyles = styled(() => commonStyles);

const DoctorCard = ({ doctor }) => {
    const classes = useStyles();

    const { loggedInPatientHealthPackage } = usePatientContext();
    const { setSelectedDoctor } = useDoctorContext();
    const price = calcPrice(doctor.hourlyRate, loggedInPatientHealthPackage && loggedInPatientHealthPackage.doctorDiscount);
    return (
        <ListItemButton onClick={() => setSelectedDoctor(doctor)}>
            <ListItemAvatar sx={{ paddingRight: '2%' }}>
                <img
                    src={DoctorIcon}
                    alt={doctor.name}
                    width='40'
                    height='40'
                />
            </ListItemAvatar>
            <ListItemText
                primary={`Dr. ${doctor.userData.name}`}
                secondary={doctor.speciality}
                className={classes.listItemText}
            />
            <ListItemText sx={{ paddingLeft: '2%' }}>
                <DoctorPrice
                    priceBeforeDiscount={doctor.hourlyRate}
                    priceAfterDiscount={price}
                    margin={5}
                />
            </ListItemText>
        </ListItemButton>
    );
};

export default DoctorCard;
