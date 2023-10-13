import React, { useState, useEffect } from 'react';
import PrescriptionsList from './PrescriptionsList';
import MainCard from '../../ui-component/cards/MainCard';
import { patientAxios } from '../../utils/AxiosConfig';
import PrescriptionDetails from './PrescriptionDetails';
import { useUserContext } from 'hooks/useUserContext';
const Prescriptions = () => {

	// Assuming a patientID
	const { user } = useUserContext();
	const patientID = user.id;
	
	const [prescriptions, setPrescritpions] = useState([]);
	const [selectedPrescription, setSelectedPrescription] = useState(null);
	const [prescriptionDoctor, setPrescriptionDoctor] = useState(null);
	useEffect(() => {
		const getPrescriptions = async () => {
			try {
				const patientResponse = await patientAxios.get(`patient/${patientID}/prescriptions`);
				setPrescritpions(patientResponse.data);
			} catch (err) {
				console.log(err);
			}
		};
		getPrescriptions();
	}, []);

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