import React, { useState, useEffect } from 'react';
import { useUserContext } from 'hooks/useUserContext.js';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import AdminRow from './AdminRow';
import DeleteConfirmationDialog from '../../ui-component/DeleteConfirmationDialog';
import AddAdminDialog from './AddAdminDialog';
import { authenticationAxios, clinicAxios } from '../../utils/AxiosConfig';
import Message from '../../ui-component/Message';

const Admins = () => {
	const { user } = useUserContext();
	const [admins, setAdmins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [newAdminUsername, setNewAdminUsername] = useState('');
	const [newAdminPassword, setNewAdminPassword] = useState('');
	const [newAdminEmail, setNewAdminEmail] = useState('');
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [adminToDelete, setAdminToDelete] = useState('');
	const [addAdmin, setAddAdmin] = useState(false);
	const [removeAdmin, setRemoveAdmin] = useState(false);
	const [adminIsBeingAdded, setAdminIsBeingAdded] = useState(false);
	const [adminIsBeingDeleted, setAdminIsBeingDeleted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [strength, setStrength] = useState(0);
	const [level, setLevel] = useState();

	useEffect(() => {
		clinicAxios
			.get('/admins')
			.then((response) => response.data)
			.then((data) => {
				setAdmins(
					data.admins.filter((admin) => admin.userName !== user.userName),
				);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				console.error('Error getting admins:', err);
			});
	}, [admins.length]);

	const handleRemoveAdmin = (adminId) => {
		setAdminToDelete(adminId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		const adminToBeDeleted = admins.find(
			(admin) => admin._id === adminToDelete,
		);
		if (adminToBeDeleted && adminToBeDeleted.mainAdmin) {
			setConfirmDeleteDialogOpen(false);
			return;
		}

		setAdminIsBeingDeleted(true);
		clinicAxios
			.delete(`/admins/${adminToDelete}`)
			.then(() => {
				setAdmins((prevAdmins) =>
					prevAdmins.filter((admin) => admin._id !== adminToDelete),
				);
				setAdminIsBeingDeleted(false);
				setAdminToDelete('');
				setConfirmDeleteDialogOpen(false);
				setRemoveAdmin(true);
				setTimeout(() => {
					setRemoveAdmin(false);
				}, 2000);
			})
			.catch((error) => {
				setAdminIsBeingDeleted(false);
				setErrorMessage('Error in deleting admin.');
				console.error('Error deleting admin:', error);
			});
	};

	const handleCancelDelete = () => {
		setAdminToDelete('');
		setConfirmDeleteDialogOpen(false);
		setErrorMessage('');
		setAdminIsBeingDeleted(false);
	};

	const handleOpenAddDialog = () => {
		setOpenAddDialog(true);
	};

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
			email: newAdminEmail
		};

		if (!newAdminUsername || !newAdminPassword || !newAdminEmail) {
			return;
		}

		// Make a POST request to add a new admin
		//TODO: these conditions
		setAdminIsBeingAdded(true);
		authenticationAxios
			.post('/admins/clinic', JSON.stringify(newAdmin), {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => response.data)
			.then(() => {
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
				}, 2000);
			})
			.catch((error) => {
				setAdminIsBeingAdded(false);
				if (error.response) {
					if (error.response.status == 400) {
						setErrorMessage(
							error.response.data.message,
						);
						return;
					}
				} else console.error('Error adding admin:', error);
			});
	};

	const isAddButtonDisabled = !newAdminUsername || !newAdminPassword || !newAdminEmail || !level || level.label != 'Strong';

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
									admins.map((admin) => (
										<AdminRow
											key={admin._id}
											admin={admin}
											handleRemoveAdmin={handleRemoveAdmin}
										/>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<Fab
						color='secondary'
						aria-label='Add'
						onClick={handleOpenAddDialog}
						sx={{
							position: 'fixed',
							bottom: 16,
							right: 16,
							zIndex: 9999,
						}}
					>
						<AddIcon />
					</Fab>

					{addAdmin && (
						<Message
							message={'Admin added successfully!'}
							type={'success'}
							time={2000}
							vertical={'bottom'}
							horizontal={'left'}
						/>
					)}

					{removeAdmin && (
						<Message
							message={'Admin removed successfully!'}
							type={'success'}
							time={2000}
							vertical={'bottom'}
							horizontal={'left'}
						/>
					)}

					<AddAdminDialog
						openAddDialog={openAddDialog}
						handleCloseAddDialog={handleCloseAddDialog}
						newAdminUsername={newAdminUsername}
						newAdminPassword={newAdminPassword}
						newAdminEmail={newAdminEmail}
						setNewAdminUsername={setNewAdminUsername}
						setNewAdminPassword={setNewAdminPassword}
						setNewAdminEmail={setNewAdminEmail}
						handleAddAdmin={handleAddAdmin}
						isAddButtonDisabled={isAddButtonDisabled}
						adminIsBeingAdded={adminIsBeingAdded}
						level={level}
						setLevel={setLevel}
						strength={strength}
						setStrength={setStrength}
						errorMessage={errorMessage}
					/>

					<DeleteConfirmationDialog
						open={confirmDeleteDialogOpen}
						onClose={handleCancelDelete}
						onConfirm={handleConfirmDelete}
						title='Confirm Delete'
						content='Are you sure you want to delete this admin?'
						someoneIsBeingDeleted={adminIsBeingDeleted}
						errorMessage={errorMessage}
					/>
				</div>
			)}
		</MainCard>
	);
};

export default Admins;
