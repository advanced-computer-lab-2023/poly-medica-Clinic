import {
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    Tooltip
} from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import { getDay, getTime } from '../../utils/DateFormatter.js';
import AppointmentStatus from './AppointmentStatus.js';

const AppointmentCard = ({ appointment, setSelectedAppointment, isRunning }) => {
    return (
        <Tooltip title={isRunning ? 'Appointment is running' : ''}>
            <ListItemButton
                sx={{ background: isRunning ? '#F0E68C' : 'white' }}
                onClick={() => setSelectedAppointment(appointment)}>
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
                <AppointmentStatus appointmentStatus={appointment.status} />
            </ListItemButton>
        </Tooltip>
    );
};

export default AppointmentCard;