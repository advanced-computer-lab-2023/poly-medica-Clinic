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
import { useAdminContext } from 'hooks/useAdminContext';

const AdminCard = ({ admin }) => {

	const { setSelectedAdmin, setAdminToDelete, setConfirmDeleteDialogOpen } = useAdminContext();

	const handleRemoveAdmin = (e, adminId) => {
		e.stopPropagation();
		setAdminToDelete(adminId);
		setConfirmDeleteDialogOpen(true);
	};

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
