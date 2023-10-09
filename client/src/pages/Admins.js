import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';

const Admins = () => {
	const [admins, setAdmins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [newAdminUsername, setNewAdminUsername] = useState('');
	const [newAdminPassword, setNewAdminPassword] = useState('');
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [adminToDelete, setAdminToDelete] = useState(null);

	useEffect(() => {
		fetch('http://localhost:8001/admins')
			.then((response) => response.json())
			.then((data) => {
				console.log(data.admins, 'data in Admins page');
				setAdmins(data.admins);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, []);

	const handleRemoveAdmin = (adminId) => {
		setAdminToDelete(adminId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		// Check if the admin being deleted is a main admin
		const adminToBeDeleted = admins.find(
			(admin) => admin._id === adminToDelete,
		);
		if (adminToBeDeleted && adminToBeDeleted.mainAdmin) {
			// If it's a main admin, prevent deletion and show a message
			setConfirmDeleteDialogOpen(false);
			return;
		}

		fetch(`http://localhost:8001/admins/${adminToDelete}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then(() =>
				setAdmins((prevAdmins) =>
					prevAdmins.filter((admin) => admin._id !== adminToDelete),
				),
			)
			.catch((error) => {
				console.error('Error deleting admin:', error);
			})
			.finally(() => {
				setAdminToDelete(null);
				setConfirmDeleteDialogOpen(false);
			});
	};

	const handleCancelDelete = () => {
		setAdminToDelete(null);
		setConfirmDeleteDialogOpen(false);
	};

	const handleOpenAddDialog = () => {
		setOpenAddDialog(true);
	};

	const handleCloseAddDialog = () => {
		setOpenAddDialog(false);
		setNewAdminUsername('');
		setNewAdminPassword('');
	};

	const handleAddAdmin = () => {
		const newAdmin = {
			userName: newAdminUsername,
			password: newAdminPassword,
		};

		if (!newAdminUsername || !newAdminPassword) {
			return;
		}

		// Make a POST request to add a new admin
		fetch('http://localhost:8001/admins', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newAdmin),
		})
			.then((response) => response.json())
			.then(() => {
				setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
				setOpenAddDialog(false);
				setNewAdminUsername('');
				setNewAdminPassword('');
			})
			.catch((error) => {
				console.error('Error adding admin:', error);
			});
	};

	const isAddButtonDisabled = !newAdminUsername || !newAdminPassword;

	return (
		<MainCard title='Admins'>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Username</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Array.isArray(admins) &&
									admins.map((admin, index) => (
										<TableRow key={index}>
											<TableCell>{admin.userName}</TableCell>
											<TableCell>
												{admin.mainAdmin ? (
													<Tooltip title="Main Admin Can't be deleted">
														<IconButton disabled>
															<DeleteIcon />
														</IconButton>
													</Tooltip>
												) : (
													<IconButton
														onClick={() => handleRemoveAdmin(admin._id)}
														color='error'
													>
														<DeleteIcon />
													</IconButton>
												)}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<Button
						variant='contained'
						color='primary'
						onClick={handleOpenAddDialog}
						style={{
							position: 'fixed',
							bottom: '20px',
							right: '50px',
						}}
					>
						<AddIcon />
						Add Admin
					</Button>
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

					{/* Confirmation Dialog for Delete */}
					<Dialog open={confirmDeleteDialogOpen} onClose={handleCancelDelete}>
						<DialogTitle>Confirm Delete</DialogTitle>
						<DialogContent>
							Are you sure you want to delete this admin?
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCancelDelete} color='primary'>
								Cancel
							</Button>
							<Button
								onClick={handleConfirmDelete}
								color='error'
								variant='contained'
							>
								Delete
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			)}
		</MainCard>
	);
};

export default Admins;
