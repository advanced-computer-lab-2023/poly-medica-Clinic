import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDoctorContext } from 'hooks/useDoctorContext';
import { formatDoctorDate } from 'utils/DateFormat';

const DoctorRow = ({ doctor }) => {

	const { setDoctorToDelete, setConfirmDeleteDialogOpen } = useDoctorContext();

	const handleRemoveDoctor = (doctorId) => {
		setDoctorToDelete(doctorId);
		setConfirmDeleteDialogOpen(true);
	};

	return (
		<TableRow key={doctor._id}>
			<TableCell>{doctor.userData.name}</TableCell>
			<TableCell>{doctor.userData.userName}</TableCell>
			<TableCell>{doctor.userData.email}</TableCell>
			<TableCell>{formatDoctorDate(doctor.userData.dateOfBirth)}</TableCell>
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
