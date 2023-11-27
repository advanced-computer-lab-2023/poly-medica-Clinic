
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Grid,
	IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MedicineCard from './MedicineCard';
import { Add } from '@mui/icons-material';

const PrescriptionDetails = ({ selectedPrescription, prescriptionDoctor, handleDialogClose, medicines }) => {
	return (

		<Dialog open={selectedPrescription} onClose={handleDialogClose} PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}  >
			{selectedPrescription && prescriptionDoctor && (
				<>
					{/* <DialogTitle align='center' variant='h4'>{`Dr. ${prescriptionDoctor.userData.name}`}</DialogTitle> */}
					<DialogContent>
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
							<Typography variant="h4">{`Dr. ${prescriptionDoctor.userData.name}`}</Typography>
							<Typography variant="body1">{`${prescriptionDoctor.speciality} Clinic`}</Typography>
						</div>
						<Typography variant="subtitle1">Date:</Typography>
						<Typography variant="body1">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								{dayjs(selectedPrescription.date).format('LL')}
							</LocalizationProvider>
						</Typography>
						<Typography variant="subtitle1">Filled:</Typography>
						<Typography variant="body1">
							{selectedPrescription.filled ? 'Yes' : 'No'}
						</Typography>
						<Typography variant="subtitle1">Medicines:</Typography>
						{
							medicines.length > 0 && (
								<Grid container spacing={2}>
									{medicines.map((medicine, index) => (
										<Grid item xs={3} key={index}>
											<MedicineCard medicine={medicine} />
										</Grid>
									))}
									<Grid item xs={3}>
										<IconButton title='Add medicine' color='primary' sx={{ height: '100%', width: '100%' }}>
											<Add />
										</IconButton>
									</Grid>
								</Grid>
							)
						}


						<Typography variant="subtitle1">Description:</Typography>
						<Typography variant="body1">{selectedPrescription.description}</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose} color="primary">
							Close
						</Button>
					</DialogActions>
				</>
			)}
		</Dialog>
	);
};

export default PrescriptionDetails;
