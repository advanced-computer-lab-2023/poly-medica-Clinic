// DeleteConfirmationDialog.js

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

const DeleteConfirmationDialog = ({
	open,
	onClose,
	onConfirm,
	title,
	content,
	errorMessage,
	someoneIsBeingDeleted,
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
				{!someoneIsBeingDeleted && (
					<Button onClick={() => onConfirm()} color='error' variant='contained'>
						Delete
					</Button>
				)}
				{someoneIsBeingDeleted && (
					<Button color='primary' disabled>
						<CircularProgress color='inherit' size={25} />
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirmationDialog;
