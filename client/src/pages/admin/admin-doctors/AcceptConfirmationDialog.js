// DeleteConfirmationDialog.js

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

const AcceptConfirmationDialog = ({
	open,
	onClose,
	onConfirm,
	title,
	content,
	errorMessage,
	someoneIsBeingAccepted,
	selectedDoctorRequest,
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
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
				{!someoneIsBeingAccepted && (
					<Button
						onClick={() => onConfirm(selectedDoctorRequest)}
						color='primary'
						variant='contained'
					>
						confirm
					</Button>
				)}
				{someoneIsBeingAccepted && (
					<Button color='primary' disabled>
						<CircularProgress color='inherit' size={25} />
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default AcceptConfirmationDialog;
