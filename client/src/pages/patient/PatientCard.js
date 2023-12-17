import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
	Avatar,
	IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

const PatientCard = ({ patient, handleRemovePatient, setSelectedPatient }) => {
	return (
		<ListItem
			button
			key={patient._id}
			onClick={() => setSelectedPatient(patient)}
		>
			<ListItemAvatar>
				<Avatar>
					<PersonIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={patient.name} secondary={patient.email} />
			<ListItemSecondaryAction>
				<IconButton
					edge='end'
					aria-label='delete'
					onClick={(e) => handleRemovePatient(e, patient._id)}
					color='error'
				>
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default PatientCard;
