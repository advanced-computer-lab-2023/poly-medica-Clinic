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
import DoctorRow from './DoctorRow'; // Import the DoctorRow component
import DeleteConfirmationDialog from '../../ui-component/DeleteConfirmationDialog';
import { clinicAxios } from '../../utils/AxiosConfig';
import Message from '../../ui-component/Message';

const Doctors = () => {
	const [doctors, setDoctors] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [doctorToDelete, setDoctorToDelete] = useState(null);
	const [doctorIsBeingDeleted, setDoctorIsBeingDeleted] = useState(false);
	const [doctorDeleted, setDoctorDeleted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		clinicAxios
			.get('/doctors')
			.then((response) => {
				const data = response.data;
				setDoctors(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, [doctors.length]);

	const handleRemoveDoctor = (doctorId) => {
		setDoctorToDelete(doctorId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		setDoctorIsBeingDeleted(true);
		clinicAxios
			.delete(`/doctors/${doctorToDelete}`)
			.then(() => {
				setDoctors((prevDoctors) =>
					prevDoctors.filter((doctor) => doctor._id !== doctorToDelete),
				);
				setDoctorIsBeingDeleted(false);
				setDoctorToDelete(null);
				setConfirmDeleteDialogOpen(false);
				setDoctorDeleted(true);
				setTimeout(() => {
					setDoctorDeleted(false);
				}, 2000);
			})
			.catch((error) => {
				setDoctorIsBeingDeleted(false);
				setErrorMessage('Error deleting doctor');
				console.error('Error deleting doctor:', error);
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
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Array.isArray(doctors) &&
									doctors.map((doctor) => (
										<DoctorRow
											key={doctor._id}
											doctor={doctor}
											handleRemoveDoctor={handleRemoveDoctor}
										/>
									))}
							</TableBody>
						</Table>
					</TableContainer>

					{doctorDeleted && (
						<Message
							message={'Doctor deleted successfully!'}
							type={'success'}
							time={2000}
							vertical={'bottom'}
							horizontal={'right'}
						/>
					)}

					<DeleteConfirmationDialog
						open={confirmDeleteDialogOpen}
						onClose={handleCancelDelete}
						onConfirm={handleConfirmDelete}
						title='Confirm Delete'
						content='Are you sure you want to delete this doctor?'
						errorMessage={errorMessage}
						someoneIsBeingDeleted={doctorIsBeingDeleted}
					/>
				</div>
			)}
		</MainCard>
	);
};

export default Doctors;
