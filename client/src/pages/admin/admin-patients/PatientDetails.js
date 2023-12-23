import DoctorIcon from '../../../assets/images/icons/DoctorIcon.png';
import EmailIcon from '@mui/icons-material/Email';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import WcIcon from '@mui/icons-material/Wc';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import { getDay } from '../../../utils/DateFormatter.js';
import { usePatientContext } from 'hooks/usePatientContext';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { commonStyles } from 'ui-component/CommonStyles';

const useStyles = styled(() => commonStyles);

const PatientDetails = () => {

	const classes = useStyles();

	const title = ' ';
	const { selectedPatient, setSelectedPatient, setErrorMessage } = usePatientContext();
	const handleDialogClose = () => {
		setSelectedPatient(null);
		setErrorMessage('');
	};

	return (
		<Dialog
			open={selectedPatient}
			onClose={handleDialogClose}
			PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}
		>
			{selectedPatient && (
				<>
					<DialogTitle align='center' variant='h2'>
						{selectedPatient.name}
					</DialogTitle>
					<DialogContent>
						<div
							className={classes.container}
						>
							<div>
								<img
									src={DoctorIcon}
									alt={`${title} ${selectedPatient.name}`}
									width='100'
									height='100'
								/>
								<Typography variant='h4' sx={{ marginTop: '1em' }}>
									{`${title} ${selectedPatient.name}`}
								</Typography>
							</div>
							<div
								className={classes.infoContainer}
							>
								<div
									className={classes.emailContainer}
								>
									<EmailIcon style={{ marginRight: '0.4em' }} />
									<Typography variant='body1'>
										{`${selectedPatient.email}`}
									</Typography>
								</div>
								<div
									className={classes.emailContainer}
								>
									<PregnantWomanIcon style={{ marginRight: '0.4em' }} />
									<Typography variant='body1'>
										{`Born on ${getDay(selectedPatient.dateOfBirth)}`}
									</Typography>
								</div>
								<div
									className={classes.emailContainer}
								>
									<WcIcon style={{ marginRight: '0.4em' }} />
									<Typography variant='body1'>
										{`${selectedPatient.gender}`}
									</Typography>
								</div>
								<div
									className={classes.emailContainer}
								>
									<PhoneIcon style={{ marginRight: '0.4em' }} />
									<Typography variant='body1'>
										{`${selectedPatient.mobileNumber}`}
									</Typography>
								</div>
								<div
									className={classes.emailContainer}
								>
									<ContactEmergencyIcon style={{ marginRight: '0.4em' }} />
									<Typography variant='body1'>
										{`${selectedPatient.emergencyContact.name} - ${selectedPatient.emergencyContact.mobile}`}
									</Typography>
								</div>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose} color='primary'>
							Close
						</Button>
					</DialogActions>
				</>
			)}
		</Dialog>
	);
};

export default PatientDetails;
