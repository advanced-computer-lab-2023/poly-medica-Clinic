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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from 'ui-component/cards/MainCard';

const formatDate = (dateString) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [patientToDelete, setPatientToDelete] = useState(null);

	useEffect(() => {
		fetch('http://localhost:8002/patients')
			.then((response) => response.json())
			.then((data) => {
				console.log(data.patients, 'data in Patients page');
				setPatients(data.patients);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, []);

	const handleRemovePatient = (patientId) => {
		setPatientToDelete(patientId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		fetch(`http://localhost:8002/patients/${patientToDelete}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then(() =>
				setPatients((prevPatients) =>
					prevPatients.filter((patient) => patient._id !== patientToDelete),
				),
			)
			.catch((error) => {
				console.error('Error deleting patient:', error);
			})
			.finally(() => {
				setPatientToDelete(null);
				setConfirmDeleteDialogOpen(false);
			});
	};

	const handleCancelDelete = () => {
		setPatientToDelete(null);
		setConfirmDeleteDialogOpen(false);
	};

	return (
		<MainCard title='Patients'>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>User Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Date of Birth</TableCell>
									<TableCell>Gender</TableCell>
									<TableCell>Mobile Number</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{patients.map((patient) => (
									<TableRow key={patient._id}>
										<TableCell>{patient.name}</TableCell>
										<TableCell>{patient.userName}</TableCell>
										<TableCell>{patient.email}</TableCell>
										<TableCell>{formatDate(patient.dateOfBirth)}</TableCell>
										<TableCell>{patient.gender}</TableCell>
										<TableCell>{patient.mobileNumber}</TableCell>
										<TableCell>
											<IconButton
												aria-label='delete'
												onClick={() => handleRemovePatient(patient._id)}
												color='error'
											>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					{/* Confirmation Dialog for Delete */}
					<Dialog open={confirmDeleteDialogOpen} onClose={handleCancelDelete}>
						<DialogTitle>Confirm Delete</DialogTitle>
						<DialogContent>
							Are you sure you want to delete this patient?
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

export default Patients;
