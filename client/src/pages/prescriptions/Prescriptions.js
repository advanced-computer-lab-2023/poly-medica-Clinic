import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PrescriptionsList from './PrescriptionsList';
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
import { formatMedicines } from 'utils/PrescriptionUtils';
import Loader from 'ui-component/Loader';

const Prescriptions = () => {
	const { user } = useUserContext();
	const patientID =
		user.userType === PATIENT_TYPE_ENUM ? user.id : useParams().patientId;
	const { filterData, updateFilter } = useFilter();
	const [prescriptions, setPrescritpions] = useState([]);
	const [originalPrescriptions, setOriginalPrescritpions] = useState([]);
	const [selectedPrescription, setSelectedPrescription] = useState(null);
	const [prescriptionDoctor, setPrescriptionDoctor] = useState(null);
	const [medicines, setMedicines] = useState([]);
	const [loadingPrescription, setLoadingPrescription] = useState(true);
	const [loadingMedicine, setLoadingMedicine] = useState(true);
	const doctors = [];
	const singlePatientPrescriptions = user.type === DOCTOR_TYPE_ENUM;
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
				setPrescritpions(patientResponses.data);
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
	}, []);

	useEffect(() => {
		try {
			pharmacyAxios.get('/medicines').then((response) => {
				const responseMedicines = response.data.medicines;
				setMedicines(formatMedicines(responseMedicines, selectedPrescription));
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
		setPrescritpions(filteredPrescriptions);
	}, [filterData, originalPrescriptions]);

	const handleDialogClose = () => {
		setSelectedPrescription(null);
	};

	const handleSelectingPrescription = (prescription, doctor) => {
		setSelectedPrescription(prescription);
		setPrescriptionDoctor(doctor);
	};

	return loadingMedicine || loadingPrescription ? (
		<Loader />
	) : (
		<>
			<MainCard title='Prescriptions'>
				<PrescriptionsList
					prescriptions={prescriptions}
					handleSelectingPrescription={handleSelectingPrescription}
				/>

				<PrescriptionDetails
					selectedPrescription={selectedPrescription}
					prescriptionDoctor={prescriptionDoctor}
					handleDialogClose={handleDialogClose}
					medicines={medicines}
				/>
			</MainCard>
		</>
	);
};

export default Prescriptions;
