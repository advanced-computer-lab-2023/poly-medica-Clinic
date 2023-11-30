import { ListItemButton, ListItemText, ListItemAvatar, Button } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import { getDay, getTime } from '../../utils/DateFormatter.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { clinicAxios } from 'pages/utilities/AxiosConfig';

const AppointmentCard = ({ appointment, setSelectedAppointment }) => {
    const { user } = useUserContext();
    
    // TODO: move this to a Appointment Details
    // Note: the state is not updated correctly after the patch request
    const handleCompleteAppointment = () => {
        console.log('complete appointment');
        clinicAxios
            .patch(`/appointments/complete/${appointment._id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <ListItemButton onClick={() => setSelectedAppointment(appointment)}>
            <ListItemAvatar sx={{ paddingRight: '2%' }}>
                <TodayIcon />
            </ListItemAvatar>
            <ListItemText
                primary={`${getDay(appointment.date)}`}
                secondary={`at ${getTime(appointment.date)}`}
                sx={{
                    width: '60%',
                    lineHeight: '1.5em',
                    maxHeight: '3em',
                }}
            />
            {
                // TODO: move this to a Appointment Details
                user.type == 'doctor'
                &&
                <Button
                    variant="contained"
                    onClick={handleCompleteAppointment}
                    sx={{ marginLeft: 'auto' }}
                >
                    Complete
                </Button>
            }
            <ListItemText
                sx={{ paddingLeft: '2%' }}
                primary={appointment.status}
            />
        </ListItemButton>
    );
};

export default AppointmentCard;
