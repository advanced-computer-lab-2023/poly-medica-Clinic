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

const AdminCard = ({ admin, handleRemoveAdmin, setSelectedAdmin }) => {
	return (
		<ListItem button key={admin._id} onClick={() => setSelectedAdmin(admin)}>
			<ListItemAvatar>
				<Avatar>
					<PersonIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={admin.userName} secondary={admin.email} />
			<ListItemSecondaryAction>
				<IconButton
					edge='end'
					aria-label='delete'
					onClick={(e) => handleRemoveAdmin(e, admin._id)}
					color='error'
					disabled={admin.mainAdmin}
				>
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default AdminCard;
