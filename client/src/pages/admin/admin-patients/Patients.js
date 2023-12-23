import React, { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import PatientsList from './PatientsList';
import PatientDetails from './PatientDetails';
import DeleteConfirmationDialog from '../../../ui-component/DeleteConfirmationDialog';
import Message from '../../../ui-component/Message';
import Loader from 'ui-component/Loader';
import { TWO_SECONDS } from 'utils/Constants';
import { getPatients, deletePatient } from 'api/PatientAPI';
import { usePatientContext } from 'hooks/usePatientContext';
const Patients = () => {

	const { patients, setPatients, isLoading, setIsLoading, confirmDeleteDialogOpen, setConfirmDeleteDialogOpen,
		patientToDelete, setPatientToDelete, patientIsBeingDeleted, setPatientIsBeingDeleted, patientDeleted, setPatientDeleted,
		errorMessage, setErrorMessage } = usePatientContext();

	useEffect(() => {
		getPatients().then((response) => {
			setPatients(response.patients);
			setIsLoading(false);
		})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, [patients.length]);

	const handleConfirmDelete = () => {
		setPatientIsBeingDeleted(true);

		deletePatient(patientToDelete).then(() => {
			setPatients((prevPatients) =>
				prevPatients.filter((patient) => patient._id !== patientToDelete),
			);
			setPatientIsBeingDeleted(false);
			setPatientToDelete(null);
			setConfirmDeleteDialogOpen(false);
			setPatientDeleted(true);
			setTimeout(() => {
				setPatientDeleted(false);
			}, TWO_SECONDS);
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
				<Loader />
			) : (
				<>
					<PatientsList />

					<PatientDetails />

					{patientDeleted && (
						<Message
							message='Patient deleted successfully'
							severity='success'
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
