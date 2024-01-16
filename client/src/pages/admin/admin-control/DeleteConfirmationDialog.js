// DeleteConfirmationDialog.js

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { useAdminContext } from 'hooks/useAdminContext';
import { TWO_SECONDS } from 'utils/Constants';
import { deleteAdmin } from 'api/AdminAPI';


const DeleteConfirmationDialog = ({
	title,
	content,
}) => {
	const { confirmDeleteDialogOpen, errorMessage, adminIsBeingDeleted, setConfirmDeleteDialogOpen,
		setErrorMessage, setAdminIsBeingDeleted, adminToDelete, setAdminToDelete, setAdmins,
		setRemoveAdmin, admins } = useAdminContext();

	const onClose = () => {
		setAdminToDelete('');
		setConfirmDeleteDialogOpen(false);
		setErrorMessage('');
		setAdminIsBeingDeleted(false);
	};

	const onConfirm = () => {
		const adminToBeDeleted = admins.find(
			(admin) => admin._id === adminToDelete,
		);
		if (adminToBeDeleted && adminToBeDeleted.mainAdmin) {
			setConfirmDeleteDialogOpen(false);
			return;
		}
		setAdminIsBeingDeleted(true);
		deleteAdmin(adminToDelete).then(() => {
			setAdmins((prevAdmins) =>
				prevAdmins.filter((admin) => admin._id !== adminToDelete),
			);
			setAdminIsBeingDeleted(false);
			setAdminToDelete('');
			setConfirmDeleteDialogOpen(false);
			setRemoveAdmin(true);
			setTimeout(() => {
				setRemoveAdmin(false);
			}, TWO_SECONDS);
		})
			.catch((error) => {
				setAdminIsBeingDeleted(false);
				setErrorMessage('Error in deleting admin.');
				console.error('Error deleting admin:', error);
			});
	};

	return (
		<Dialog open={confirmDeleteDialogOpen} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
			{errorMessage && (
				<div className='error-message' style={{ color: 'red' }}>
					{errorMessage}
				</div>
			)}
			<DialogActions>
				<Button onClick={() => onClose()} color='primary'>
					Cancel
				</Button>
				{!adminIsBeingDeleted && (
					<Button onClick={() => onConfirm()} color='error' variant='contained'>
						Delete
					</Button>
				)}
				{adminIsBeingDeleted && (
					<Button color='primary' disabled>
						<CircularProgress color='inherit' size={25} />
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirmationDialog;
