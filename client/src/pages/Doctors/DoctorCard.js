import { ListItemButton, ListItemText, ListItemAvatar } from '@mui/material';
import DoctorIcon from '../../assets/images/icons/DoctorIcon.png';

const calcPrice =  (price) => {
    const userDiscount = 0.2; // needs user to get the id to get the discount
    const priceWithDiscount = price * (1 - userDiscount);
    const final = 1.1 * priceWithDiscount;
    return final;
};

const DoctorCard = ({ doctor, setSelectedDoctor }) => {
    const price = calcPrice(doctor.hourlyRate);
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
                primary={doctor.userData.name}
                secondary={doctor.speciality}
                sx={{
                    width: '60%',
                    lineHeight: '1.5em',
                    maxHeight: '3em',
                }}
            />
            <ListItemText sx={{ paddingLeft: '2%' }} primary={`$${price}`} />
        </ListItemButton>
    );
};

export default DoctorCard;
