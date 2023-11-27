import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const formatDate = (dateString) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const PatientRow = ({ patient, handleRemovePatient }) => {
	return (
		<TableRow key={patient._id}>
			<TableCell>{patient.name}</TableCell>
			<TableCell>{patient.userName}</TableCell>
			<TableCell>{patient.email}</TableCell>
			<TableCell>{formatDate(patient.dateOfBirth)}</TableCell>
			<TableCell>{patient.gender}</TableCell>
			<TableCell>{patient.mobileNumber}</TableCell>
			<TableCell>
				<IconButton
					aria-label='delete'
					onClick={() => handleRemovePatient(patient._id)}
					color='error'
				>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default PatientRow;
