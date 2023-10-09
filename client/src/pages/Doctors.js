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

const Doctors = () => {
	const [doctors, setDoctors] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [doctorToDelete, setDoctorToDelete] = useState(null);

	useEffect(() => {
		fetch('http://localhost:8001/doctors', {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
				setDoctors(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, []);

	const handleRemoveDoctor = (doctorId) => {
		setDoctorToDelete(doctorId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		fetch(`http://localhost:8001/doctors/${doctorToDelete}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then(() =>
				setDoctors((prevDoctors) =>
					prevDoctors.filter((doctor) => doctor._id !== doctorToDelete),
				),
			)
			.catch((error) => {
				console.error('Error deleting patient:', error);
			})
			.finally(() => {
				setDoctorToDelete(null);
				setConfirmDeleteDialogOpen(false);
			});
	};

	const handleCancelDelete = () => {
		setDoctorToDelete(null);
		setConfirmDeleteDialogOpen(false);
	};

	return (
		<MainCard title='Doctors'>
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
									<TableCell>Speciality</TableCell>
									<TableCell>Hourly Rate</TableCell>
									<TableCell>Affiliation</TableCell>
									<TableCell>Educational Background</TableCell>
									<TableCell>Available Slots</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{doctors.map((doctor) => (
									<TableRow key={doctor._id}>
										<TableCell>{doctor.userData.name}</TableCell>
										<TableCell>{doctor.userData.userName}</TableCell>
										<TableCell>{doctor.userData.email}</TableCell>
										<TableCell>
											{formatDate(doctor.userData.dateOfBirth)}
										</TableCell>
										<TableCell>{doctor.speciality}</TableCell>
										<TableCell>{doctor.hourlyRate}</TableCell>
										<TableCell>{doctor.affiliation}</TableCell>
										<TableCell>{doctor.educationalBackground}</TableCell>
										<TableCell>{doctor.availableSlots}</TableCell>
										<TableCell>
											<IconButton
												aria-label='delete'
												onClick={() => handleRemoveDoctor(doctor._id)}
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
							Are you sure you want to delete this doctor?
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

export default Doctors;
