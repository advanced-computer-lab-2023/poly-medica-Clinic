import React from 'react';
import PrescriptionsList from './PrescriptionsList';
import MainCard from '../../ui-component/cards/MainCard';
const Prescriptions = () => {
	const prescriptions = ['Antinal', 'Panadol', 'Nasal_Spray'];
	return (
		<>
			<MainCard title="Prescriptions">
				<PrescriptionsList prescriptions={prescriptions}/>
			</MainCard>
		</>
	);
};

export default Prescriptions;