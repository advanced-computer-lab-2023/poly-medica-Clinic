import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PrescriptionsList from './PrescriptionsList';
import EditPrescription from './EditPrescription';
import AddPrescription from './AddPrescription';
import MainCard from '../../ui-component/cards/MainCard';
import { patientAxios } from '../../utils/AxiosConfig';
import PrescriptionDetails from './PrescriptionDetails';
import { useUserContext } from 'hooks/useUserContext';
import { useFilter } from 'contexts/FilterContext';
import {
	DATE_FILTER_ARRAY,
	DOCTOR_TYPE_ENUM,
	PATIENT_TYPE_ENUM,
} from 'utils/Constants';
import { filterAppointmentsByDate } from 'utils/AppointmentUtils';
import { pharmacyAxios } from 'pages/utilities/AxiosConfig';
import Loader from 'ui-component/Loader';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Prescriptions = () => {
	const { user } = useUserContext();
	const patientID =
		user.type === PATIENT_TYPE_ENUM ? user.id : useParams().patientId;
	const { filterData, updateFilter } = useFilter();
	const [prescriptions, setPrescriptions] = useState([]);
	const [originalPrescriptions, setOriginalPrescritpions] = useState([]);
	const [selectedPrescription, setSelectedPrescription] = useState(null);
	const [prescriptionDoctor, setPrescriptionDoctor] = useState(null);
	const [medicines, setMedicines] = useState([]);
	const [loadingPrescription, setLoadingPrescription] = useState(true);
	const [loadingMedicine, setLoadingMedicine] = useState(true);
	const doctors = [];
	const singlePatientPrescriptions = user.type === DOCTOR_TYPE_ENUM;
	const [selectedEditPrescription, setSelectedEditPrescription] =
		useState(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [editErrorMessage, setEditErrorMessage] = useState('');
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [description, setDescription] = useState('');
	const [patientName, setPatientName] = useState('');

	useEffect(() => {
		const getPrescriptions = async () => {
			try {
				const patientResponses = await patientAxios.get(
					`patient/${patientID}/prescriptions`,
				);
				if (singlePatientPrescriptions) {
					const filteredPrescriptions = patientResponses.data.filter(
						(prescription) => prescription.doctorId === user.id,
					);
					patientResponses.data = filteredPrescriptions;
				}
				setPrescriptions(patientResponses.data);
				setOriginalPrescritpions(patientResponses.data);
				for (let i = 0; i < patientResponses.data.length; i++) {
					const patientResponse = patientResponses.data[i];
					doctors.push(patientResponse.doctorName);
				}
				updateFilter([
					{
						attribute: 'Date',
						values: DATE_FILTER_ARRAY,
					},
					{
						attribute: 'Doctor',
						values: doctors,
					},
					{
						attribute: 'Filled',
						values: ['true', 'false'],
					},
				]);
				setLoadingPrescription(false);
				console.log('prescription now false');
			} catch (err) {
				setLoadingPrescription(false);
				console.log(err);
			}
		};
		getPrescriptions();
	}, [prescriptions.length]);

	useEffect(() => {
		patientAxios.get(`/patients/${patientID}`).then((response) => {
			setPatientName(response.data.patient.name);
		}
		);
	},[]);

	useEffect(() => {
		try {
			pharmacyAxios.get('/medicines').then((response) => {
				const responseMedicines = response.data.medicines;
				setMedicines(responseMedicines);
				setLoadingMedicine(false);
			});
		} catch (err) {
			console.log(err.message);
			setLoadingMedicine(false);
		}
	}, [selectedPrescription]);

	useEffect(() => {
		const filteredPrescriptions = originalPrescriptions.filter(
			(prescription) =>
				(!filterData[0].selectedValue ||
					filterAppointmentsByDate(
						prescription,
						filterData[0].selectedValue,
					)) &&
				(!filterData[1].selectedValue ||
					prescription.doctorName.toString() ===
						filterData[1].selectedValue.toString()) &&
				(!filterData[2].selectedValue ||
					prescription.filled.toString() === filterData[2].selectedValue),
		);
		setPrescriptions(filteredPrescriptions);
	}, [filterData, originalPrescriptions]);

	const handleDialogClose = () => {
		setSelectedPrescription(null);
	};

	const handleSelectingPrescription = (prescription, doctor) => {
		console.log('prescription 000 === ', prescription);
		console.log('doctor 0000 === ', doctor);
		setSelectedPrescription(prescription);
		setPrescriptionDoctor(doctor);
	};

	const handleEditButtonClick = (prescription, event) => {
		event.stopPropagation();
		setSelectedEditPrescription(prescription);
		setIsEditDialogOpen(true);
	};

	const handleSaveEdit = (e) => {
		e.preventDefault();
		patientAxios
			.patch('/prescriptions/' + selectedEditPrescription._id, {
				prescription: selectedEditPrescription,
			})
			.then((response) => {
				const updatedPrescription = response.data;
				const updatedPrescriptions = prescriptions.map((prescription) => {
					if (prescription._id === updatedPrescription._id) {
						return updatedPrescription;
					}
					return prescription;
				});
				setIsEditDialogOpen(false);
				setTimeout(() => {
					setPrescriptions(updatedPrescriptions);
					setOriginalPrescritpions(updatedPrescriptions);
					setSelectedEditPrescription(null);
					setEditErrorMessage('');
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setEditErrorMessage('Error updating prescription');
			});
	};

	const handleAddButtonClick = (event) => {
		event.stopPropagation();
		setIsAddDialogOpen(true);
	};

	const handleCancelAdd = () => {
		setIsAddDialogOpen(false);
		setDescription('');
	};

	const handleConfirmAdd = (e) => {
		e.preventDefault();
		const prescription = {
			patientId: patientID,
			doctorId: user.id,
			doctorName: user.userName,
			date: new Date(),
			filled: false,
			description,
			medicines: [],
			price: 0,
		};
		patientAxios
			.post('/prescriptions', { prescription })
			.then(() => {
				setPrescriptions((prev) => [...prev, prescription]);
				setIsAddDialogOpen(false);
				setDescription('');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return loadingMedicine || loadingPrescription ? (
		<Loader />
	) : (
		<MainCard title= {`Mr/Mrs ${patientName} Prescriptions`}>
			<PrescriptionsList
				prescriptions={prescriptions}
				handleSelectingPrescription={handleSelectingPrescription}
				handleEditButtonClick={handleEditButtonClick}
			/>

			<PrescriptionDetails
				selectedPrescription={selectedPrescription}
				setSelectedPrescription={setSelectedPrescription}
				prescriptionDoctor={prescriptionDoctor}
				handleDialogClose={handleDialogClose}
				medicines={medicines}
			/>

			<EditPrescription
				isEditDialogOpen={isEditDialogOpen}
				setIsEditDialogOpen={setIsEditDialogOpen}
				selectedEditPrescription={selectedEditPrescription}
				handleSaveEdit={handleSaveEdit}
				setSelectedEditPrescription={setSelectedEditPrescription}
				editErrorMessage={editErrorMessage}
				setEditErrorMessage={setEditErrorMessage}
			/>

			{user.type === DOCTOR_TYPE_ENUM && (
				<Fab
					color='secondary'
					aria-label='Add'
					onClick={handleAddButtonClick}
					sx={{
						position: 'fixed',
						bottom: 16,
						right: 16,
						zIndex: 9999,
					}}
				>
					<AddIcon />
				</Fab>
			)}

			<AddPrescription
				isAddDialogOpen={isAddDialogOpen}
				handleConfirmAdd={handleConfirmAdd}
				handleCancelAdd={handleCancelAdd}
				setDescription={setDescription}
			/>
		</MainCard>
	);
};

export default Prescriptions;
