import {
    ListItemButton,
    ListItemText,
    ListItemAvatar,
} from '@mui/material';
import DoctorIcon from '../../../assets/images/icons/DoctorIcon.png';
import { calcPrice } from '../../../utils/PriceCalculator.js';
import DoctorPrice from './DoctorPrice.js';

const DoctorCard = ({ doctor, setSelectedDoctor, loggedInPatientHealthPackage }) => {
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
                sx={{
                    width: '60%',
                    lineHeight: '1.5em',
                    maxHeight: '3em',
                }}
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
