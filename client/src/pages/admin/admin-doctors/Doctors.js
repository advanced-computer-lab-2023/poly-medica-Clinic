import React, { useEffect } from 'react';
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
import DeleteConfirmationDialog from '../../../ui-component/DeleteConfirmationDialog';
import Message from '../../../ui-component/Message';
import { TWO_SECONDS } from 'utils/Constants';
import { useDoctorContext } from 'hooks/useDoctorContext';
import Loader from 'ui-component/Loader';
import { deleteDoctor, getDoctors } from 'api/DoctorAPI';

const Doctors = () => {

	const { doctors, setDoctors, isLoading, setIsLoading, confirmDeleteDialogOpen,
		setConfirmDeleteDialogOpen, doctorToDelete, setDoctorToDelete, doctorIsBeingDeleted,
		setDoctorIsBeingDeleted, doctorDeleted, setDoctorDeleted, errorMessage, setErrorMessage } = useDoctorContext();

	useEffect(() => {

		getDoctors().then((response) => {
			console.log('response = ', response);
			setDoctors(response);
			setIsLoading(false);
		})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, [doctors.length]);

	const handleConfirmDelete = () => {
		setDoctorIsBeingDeleted(true);
		deleteDoctor(doctorToDelete).then(() => {
			setDoctors((prevDoctors) =>
				prevDoctors.filter((doctor) => doctor._id !== doctorToDelete),
			);
			setDoctorIsBeingDeleted(false);
			setDoctorToDelete(null);
			setConfirmDeleteDialogOpen(false);
			setDoctorDeleted(true);
			setTimeout(() => {
				setDoctorDeleted(false);
			}, TWO_SECONDS);
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
				<Loader />
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
										<DoctorRow key={doctor._id} doctor={doctor} />
									))}
							</TableBody>
						</Table>
					</TableContainer>

					{doctorDeleted && (
						<Message
							message={'Doctor deleted successfully!'}
							type={'success'}
							time={TWO_SECONDS}
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
