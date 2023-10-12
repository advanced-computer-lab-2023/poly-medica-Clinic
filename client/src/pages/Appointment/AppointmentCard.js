import { ListItemButton, ListItemText, ListItemAvatar } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';

const AppointmentCard = ({ appointment, setSelectedAppointment }) => {
	return (
		<ListItemButton onClick={() => setSelectedAppointment(appointment)}>
			<ListItemAvatar sx={{ paddingRight: '2%' }}>
				<TodayIcon />
			</ListItemAvatar>
			<ListItemText
				primary={appointment.date}
				sx={{
					width: '60%',
					lineHeight: '1.5em',
					maxHeight: '3em',
				}}
			/>
			<ListItemText
				sx={{ paddingLeft: '2%' }}
				primary={appointment.status}
			/>
		</ListItemButton>
	);
};

export default AppointmentCard;
