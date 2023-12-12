import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const formatDate = (dateString) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const DoctorRow = ({ doctor, handleRemoveDoctor }) => {
	return (
		<TableRow key={doctor._id}>
			<TableCell>{doctor.userData.name}</TableCell>
			<TableCell>{doctor.userData.userName}</TableCell>
			<TableCell>{doctor.userData.email}</TableCell>
			<TableCell>{formatDate(doctor.userData.dateOfBirth)}</TableCell>
			<TableCell>{doctor.speciality}</TableCell>
			<TableCell>{doctor.hourlyRate}</TableCell>
			<TableCell>{doctor.affiliation}</TableCell>
			<TableCell>{doctor.educationalBackground}</TableCell>
			<TableCell>
				<IconButton
					aria-label='delete'
					onClick={() => handleRemoveDoctor(doctor._id)}
					color='error'
				>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default DoctorRow;
