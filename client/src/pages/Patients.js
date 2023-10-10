import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import PatientRow from './PatientRow';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [patientToDelete, setPatientToDelete] = useState(null);

	useEffect(() => {
		fetch('http://localhost:8002/patients')
			.then((response) => response.json())
			.then((data) => {
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
								{Array.isArray(patients) &&
									patients.map((patient) => (
										<PatientRow
											key={patient._id}
											patient={patient}
											handleRemovePatient={handleRemovePatient}
										/>
									))}
							</TableBody>
						</Table>
					</TableContainer>

					{/* Confirmation Dialog for Delete */}
					<DeleteConfirmationDialog
						open={confirmDeleteDialogOpen}
						onClose={handleCancelDelete}
						onConfirm={handleConfirmDelete}
						title='Confirm Delete'
						content='Are you sure you want to delete this patient?'
					/>
				</div>
			)}
		</MainCard>
	);
};

export default Patients;
