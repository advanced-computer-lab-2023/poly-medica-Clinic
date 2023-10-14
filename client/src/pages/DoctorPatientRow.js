import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import HealthRecordDetails from './HealthRecordDetails';
// import { useEffect } from 'react';

const formatDate = (dateString) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const PatientRow = ({ patient }) => {
	const [isPatientDetailsOpen, setPatientDetailsOpen] = useState(false);
 
	const handleOpen = () => {
		setPatientDetailsOpen(true);
	};
 
	const handleClose = () => {
		console.log('here');
		setPatientDetailsOpen(false);
	};
	

	return (
		
	<>
		<TableRow
			key={patient._id}
			hover={true}
			onClick={handleOpen} 
			sx={ { cursor: 'pointer' } }  
		>
			<TableCell>{patient.name}</TableCell>
			<TableCell>{patient.email}</TableCell>
			<TableCell>{formatDate(patient.dateOfBirth)}</TableCell>
			<TableCell>{patient.gender}</TableCell>
			<TableCell>{patient.mobileNumber}</TableCell>
			
			{/* Conditionally render the popup based on the 'open' state */}
			

 
		</TableRow>
		<HealthRecordDetails
		isPatientDetailsOpen={isPatientDetailsOpen}
		handleClose={handleClose}
		patient={patient}
	/>
	</>
	);
};

export default PatientRow;
