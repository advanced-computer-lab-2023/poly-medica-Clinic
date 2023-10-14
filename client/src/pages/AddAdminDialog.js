// DeleteConfirmationDialog.js

import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
} from '@mui/material';

const AddAdminDialog = ({
	openAddDialog,
	handleCloseAddDialog,
	newAdminUsername,
	newAdminPassword,
	setNewAdminUsername,
	setNewAdminPassword,
	handleAddAdmin,
	isAddButtonDisabled,
	errorMessage,
}) => {
	console.log(
		'AddAdminDialog.js: AddAdminDialog: openAddDialog: ',
		openAddDialog,
	);
	return (
		<Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
			<DialogTitle>Add New Admin</DialogTitle>
			<DialogContent>
				<TextField
					label='Username'
					fullWidth
					value={newAdminUsername}
					onChange={(e) => setNewAdminUsername(e.target.value)}
					margin='normal'
					required
				/>
				<TextField
					label='Password'
					fullWidth
					value={newAdminPassword}
					onChange={(e) => setNewAdminPassword(e.target.value)}
					margin='normal'
					required
				/>
				{errorMessage && (
					<div className='error-message' style={{ color: 'red' }}>
						{errorMessage}
					</div>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseAddDialog} color='primary'>
					Cancel
				</Button>
				<Button
					onClick={handleAddAdmin}
					color='primary'
					variant='contained'
					disabled={isAddButtonDisabled}
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddAdminDialog;
