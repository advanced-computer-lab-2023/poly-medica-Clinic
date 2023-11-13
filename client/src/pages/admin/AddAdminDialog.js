// DeleteConfirmationDialog.js

import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	CircularProgress,
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
	adminIsBeingAdded,
}) => {
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
				{!adminIsBeingAdded && (
					<Button
						onClick={() => handleAddAdmin()}
						color='primary'
						variant='contained'
						disabled={isAddButtonDisabled}
					>
						Add
					</Button>
				)}
				{adminIsBeingAdded && (
					<Button color='primary' disabled>
						<CircularProgress color='inherit' size={25} />
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default AddAdminDialog;
