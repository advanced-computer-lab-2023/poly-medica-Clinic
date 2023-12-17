import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import PatientsList from './PatientsList';
import PatientDetails from './PatientDetails';
import DeleteConfirmationDialog from '../../ui-component/DeleteConfirmationDialog';
import { clinicAxios, patientAxios } from '../../utils/AxiosConfig';
import Message from '../../ui-component/Message';

const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [patientToDelete, setPatientToDelete] = useState(null);
	const [patientIsBeingDeleted, setPatientIsBeingDeleted] = useState(false);
	const [patientDeleted, setPatientDeleted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [selectedPatient, setSelectedPatient] = useState(null);

	useEffect(() => {
		patientAxios
			.get('/patients')
			.then((response) => response.data)
			.then((data) => {
				setPatients(data.patients);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, [patients.length]);

	const handleDialogClose = () => {
		setSelectedPatient(null);
		setErrorMessage('');
	};

	const handleRemovePatient = (e, patientId) => {
		e.stopPropagation();
		setPatientToDelete(patientId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		setPatientIsBeingDeleted(true);
		clinicAxios
			.delete(`/patients/${patientToDelete}`)
			.then((response) => response.data)
			.then(() => {
				setPatients((prevPatients) =>
					prevPatients.filter((patient) => patient._id !== patientToDelete),
				);
				setPatientIsBeingDeleted(false);
				setPatientToDelete(null);
				setConfirmDeleteDialogOpen(false);
				setPatientDeleted(true);
				setTimeout(() => {
					setPatientDeleted(false);
				}, 2000);
			})
			.catch((error) => {
				setPatientIsBeingDeleted(false);
				setErrorMessage('Error deleting patient');
				console.error('Error deleting patient:', error);
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
				<>
					<PatientsList
						patients={patients}
						handleRemovePatient={handleRemovePatient}
						setSelectedPatient={setSelectedPatient}
					/>

					<PatientDetails
						selectedPatient={selectedPatient}
						handleDialogClose={handleDialogClose}
					/>

					{patientDeleted && (
						<Message
							message='Patient deleted successfully'
							severity='success'
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
						content='Are you sure you want to delete this patient?'
						errorMessage={errorMessage}
						someoneIsBeingDeleted={patientIsBeingDeleted}
					/>
				</>
			)}
		</MainCard>
	);
};

export default Patients;
