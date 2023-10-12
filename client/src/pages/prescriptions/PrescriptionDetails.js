
import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
    Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const PrescriptionDetails = ({ selectedPrescription, prescriptionDoctor, handleDialogClose }) => {
    return (
		<Dialog open={selectedPrescription} onClose={handleDialogClose} PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}  >
			{selectedPrescription && prescriptionDoctor && (
				<>
					{/* <DialogTitle align='center' variant='h4'>{`Dr. ${prescriptionDoctor.userData.name}`}</DialogTitle> */}
					<DialogContent>
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
							<Typography variant="h4">{`Dr. ${prescriptionDoctor.userData.name}`}</Typography>
                            <Typography variant="body1">{`${prescriptionDoctor.specialty} Clinic`}</Typography>
						</div>
						<Typography variant="subtitle1">Date:</Typography>
						<Typography variant="body1">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {dayjs(selectedPrescription.date).format('LL')}
                            </LocalizationProvider>
                        </Typography>
						<Typography variant="subtitle1">Filled:</Typography>
						<Typography variant="body1">
                            {selectedPrescription.filled? 'Yes' : 'No'}
                        </Typography>
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
