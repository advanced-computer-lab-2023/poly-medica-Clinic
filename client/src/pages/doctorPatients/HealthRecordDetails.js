
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

const formatDate = (dateString) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

function formateEmergencyContact(emergencyContact) {

	return `Emergency Contact: \n Name: ${emergencyContact.name} \n Mobile: ${emergencyContact.mobile}`;

}

const HealthRecordDetails = ({ isPatientDetailsOpen, handleClose, patient }) => {
	const navigate = useNavigate();
	const emergencyContact = formateEmergencyContact(patient.emergencyContact);
	return (
		<Dialog
			open={isPatientDetailsOpen}
			onClose={handleClose}
			PaperProps={{
				sx: { minWidth: window.outerWidth > 800 ? 500 : 1000 },
			}}>
			<DialogTitle>Patient Details</DialogTitle>
			<DialogContent>

				<DialogContentText>
					<Typography variant='body2'>
						Name: {patient.name}
					</Typography>
					<Typography variant='body2'>
						Gender: {patient.gender}
					</Typography>
					<Typography variant='body2'>
						mobileNumber: {patient.mobileNumber}
					</Typography>
					<Typography variant='body2'>
						dateOfBirth: {formatDate(patient.dateOfBirth)}
					</Typography>
					<Typography variant='body2'>
						<pre>{emergencyContact}</pre>
					</Typography>

					<Button variant='outlined' sx={{ marginTop: '2%' }} onClick={() => { navigate(`/doctor/pages/profile/${patient._id}`); }}>
						View Pofile
					</Button>

					<Button variant='outlined' sx={{ marginTop: '2%', marginLeft: '5%' }} onClick={() => { navigate(`/doctor/pages/my-patients/${patient._id}/prescriptions`); }}>
						View Prescriptions
					</Button>

					{/* Add more patient details as needed */}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Close
				</Button>
			</DialogActions>

		</Dialog>
	);
};

export default HealthRecordDetails;
