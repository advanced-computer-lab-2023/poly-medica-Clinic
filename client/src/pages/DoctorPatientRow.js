import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import HealthRecordDetails from './HealthRecordDetails';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FollowUp from './FollowUp';

const formatDate = (dateString) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const PatientRow = ({ patient, loggedInDoctor }) => {
	const [isPatientDetailsOpen, setPatientDetailsOpen] = useState(false);
	const [isFollowUpOpen, setFollowUpOpen] = useState(false);
	
	const handlePatientDetailsOpen = () => {
		setPatientDetailsOpen(true);
	};
 
	const handlePatientDetailsClose = () => {
		setPatientDetailsOpen(false);
	};
	
	const handleFollowUpOpen = () => {
		setFollowUpOpen(true);
	};

	const handleFollowUpClose = () => {
		setFollowUpOpen(false);
	};

	return (
		
	<>
		<TableRow
			key={patient._id}
			hover={true}
			sx={ { cursor: 'pointer' } }  
		>
			<TableCell onClick={handlePatientDetailsOpen}>{patient.name}</TableCell>
			<TableCell onClick={handlePatientDetailsOpen}>{patient.email}</TableCell>
			<TableCell onClick={handlePatientDetailsOpen}>{formatDate(patient.dateOfBirth)}</TableCell>
			<TableCell onClick={handlePatientDetailsOpen}>{patient.gender}</TableCell>
			<TableCell onClick={handlePatientDetailsOpen}>{patient.mobileNumber}</TableCell>
			<TableCell onClick={handleFollowUpOpen}> 
				<CalendarMonthIcon sx = {{ 
					color: 'primary.main',
					'&:hover': { color: 'secondary.main' }
					}} 
				/>
			</TableCell>
		</TableRow>
		
		<HealthRecordDetails
			isPatientDetailsOpen={isPatientDetailsOpen}
			handleClose={handlePatientDetailsClose}
			patient={patient}
		/>

		<FollowUp
			isFollowUpOpen={isFollowUpOpen}
			handleClose={handleFollowUpClose}
			selectedPatient={patient}
			loggedInDoctor={loggedInDoctor}
		/>

				
	</>
	);
};

export default PatientRow;
