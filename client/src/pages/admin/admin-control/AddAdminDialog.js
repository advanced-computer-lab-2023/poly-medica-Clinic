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
	Box,
	Grid,
	FormControl,
	Typography,
} from '@mui/material';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { useAdminContext } from 'hooks/useAdminContext';
import { addAdmin } from 'api/AdminAPI';
import { TWO_SECONDS } from 'utils/Constants';
const AddAdminDialog = () => {

	const { openAddDialog, newAdminUsername, newAdminPassword, newAdminEmail, setNewAdminUsername, setAdmins,
		setOpenAddDialog, setErrorMessage, setNewAdminEmail, setAdminIsBeingAdded, setNewAdminPassword,
		strength, setStrength, level, setLevel, errorMessage, adminIsBeingAdded, setAddAdmin } = useAdminContext();

	const isAddButtonDisabled =
		!newAdminUsername ||
		!newAdminPassword ||
		!newAdminEmail ||
		!level ||
		level.label != 'Strong';

	const handleCloseAddDialog = () => {
		setOpenAddDialog(false);
		setNewAdminUsername('');
		setNewAdminPassword('');
		setErrorMessage('');
		setStrength(0);
		setLevel(null);
		setNewAdminEmail('');
		setAdminIsBeingAdded(false);
	};

	const handleAddAdmin = async () => {
		const newAdmin = {
			userName: newAdminUsername,
			password: newAdminPassword,
			email: newAdminEmail,
		};

		if (!newAdminUsername || !newAdminPassword || !newAdminEmail) {
			return;
		}

		setAdminIsBeingAdded(true);
		addAdmin(newAdmin).then(() => {
			setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
			setAdminIsBeingAdded(false);
			setOpenAddDialog(false);
			setNewAdminUsername('');
			setNewAdminPassword('');
			setErrorMessage('');
			setAddAdmin(true);
			setStrength(0);
			setLevel(null);
			setNewAdminEmail('');
			setTimeout(() => {
				setAddAdmin(false);
			}, TWO_SECONDS);
		}).catch((error) => {
			setAdminIsBeingAdded(false);
			if (error.response) {
				if (error.response.status == 400) {
					setErrorMessage(error.response.data.message);
					return;
				}
			} else console.error('Error adding admin:', error);
		});
	};

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
					onChange={(e) => {
						setNewAdminPassword(e.target.value);
						const temp = strengthIndicator(e.target.value);
						setStrength(temp);
						setLevel(strengthColor(temp));
					}}
					margin='normal'
					required
				/>
				{strength !== 0 && (
					<FormControl fullWidth>
						<Box sx={{ mb: 2 }}>
							<Grid container spacing={2} alignItems='center'>
								<Grid item>
									<Box
										style={{ backgroundColor: level?.color }}
										sx={{ width: 85, height: 8, borderRadius: '7px' }}
									/>
								</Grid>
								<Grid item>
									<Typography variant='subtitle1' fontSize='0.75rem'>
										{level?.label}
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</FormControl>
				)}
				<TextField
					label='email'
					fullWidth
					value={newAdminEmail}
					onChange={(e) => setNewAdminEmail(e.target.value)}
					margin='normal'
					type='email'
					required
				/>
				{errorMessage && (
					<div className='error-message' style={{ color: 'red' }}>
						{errorMessage}
					</div>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleCloseAddDialog()} color='primary'>
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
