import React from 'react';
import { List } from '@mui/material';
import PatientCard from './PatientCard';
import { useUserContext } from 'hooks/useUserContext';

const PatientsList = ({
	patients,
	handleRemovePatient,
	setSelectedPatient,
}) => {
	const { user } = useUserContext();
	console.log({ user });
	return (
		<List>
			{Array.isArray(patients) &&
				patients.map((patient, index) => {
					return (
						<div key={index}>
							<div key={index}>
								<PatientCard
									patient={patient}
									handleRemovePatient={handleRemovePatient}
									setSelectedPatient={setSelectedPatient}
								></PatientCard>
							</div>
						</div>
					);
				})}
		</List>
	);
};

export default PatientsList;
