import React from 'react';
import { List } from '@mui/material';
import PatientCard from './PatientCard';
import { usePatientContext } from 'hooks/usePatientContext';

const PatientsList = () => {
	const { patients } = usePatientContext();
	return (
		<List>
			{Array.isArray(patients) &&
				patients.map((patient, index) => {
					return (
						<div key={index}>
							<div key={index}>
								<PatientCard
									patient={patient}
								></PatientCard>
							</div>
						</div>
					);
				})}
		</List>
	);
};

export default PatientsList;
