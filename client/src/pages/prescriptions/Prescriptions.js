import React, { useState, useEffect } from 'react';
import PrescriptionsList from './PrescriptionsList';
import MainCard from '../../ui-component/cards/MainCard';
import { patientAxios } from '../../utils/AxiosConfig';
import PrescriptionDetails from './PrescriptionDetails';
import { useUserContext } from 'hooks/useUserContext';
import { useFilter } from 'contexts/FilterContext';
import { DATE_FILTER_ARRAY } from 'utils/Constants';
import { filterAppointmentsByDate } from 'utils/AppointmentUtils';

const Prescriptions = () => {

	// Assuming a patientID
	const { user } = useUserContext();
	const patientID = user.id;
	const { filterData, updateFilter } = useFilter();
	const [prescriptions, setPrescritpions] = useState([]);
	const [originalPrescriptions, setOriginalPrescritpions] = useState([]);
	const [selectedPrescription, setSelectedPrescription] = useState(null);
	const [prescriptionDoctor, setPrescriptionDoctor] = useState(null);
	const doctors = [];
	useEffect(() => {
		const getPrescriptions = async () => {
			try {
				const patientResponses = await patientAxios.get(`patient/${patientID}/prescriptions`);
				console.log('patientResponses = ', patientResponses);
				setPrescritpions(patientResponses.data);
				setOriginalPrescritpions(patientResponses.data);
				for (let i = 0; i < patientResponses.data.length; i++) {
					const patientResponse = patientResponses.data[i];
					doctors.push(patientResponse.doctorName);
				}
				updateFilter([{
					attribute: 'Date',
					values: DATE_FILTER_ARRAY
				}, {
					attribute: 'Doctor',
					values: doctors
				},
				{
					attribute: 'Filled',
					values: ['true', 'false']
				}
				]);
			} catch (err) {
				console.log(err);
			}
		};
		getPrescriptions();

	}, []);

	useEffect(() => {
		const filteredPrescriptions = originalPrescriptions.filter((prescription) =>
			(!filterData[0].selectedValue || filterAppointmentsByDate(prescription, filterData[0].selectedValue)) &&
			(!filterData[1].selectedValue || prescription.doctorName.toString() === filterData[1].selectedValue.toString()) &&
			(!filterData[2].selectedValue || prescription.filled.toString() === filterData[2].selectedValue)
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

	return (
		<>
			<MainCard title="Prescriptions">
				<PrescriptionsList
					prescriptions={prescriptions}
					handleSelectingPrescription={handleSelectingPrescription}
				/>

				<PrescriptionDetails
					selectedPrescription={selectedPrescription}
					prescriptionDoctor={prescriptionDoctor}
					handleDialogClose={handleDialogClose}
				/>
			</MainCard>
		</>
	);
};

export default Prescriptions;