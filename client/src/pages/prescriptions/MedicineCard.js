import * as React from 'react';

import { ListItem, ListItemText, Grid, IconButton, Tooltip } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { IconMinus } from '@tabler/icons';
import { updatePrescription } from 'utils/PrescriptionUtils';
export default function MedicineCard({
	medicine,
	selectedPrescription,
	setSelectedPrescription,
	userType,
}) {
	const handleMedicineAmount = (value) => {
		medicine.amount += value;
		if (medicine.amount < 1) medicine.amount = 1;
		const medicineIndex = selectedPrescription.medicines.findIndex(
			(prescriptionMedicine) =>
				prescriptionMedicine.medicineId.toString() === medicine._id.toString(),
		);
		if (medicineIndex !== -1) {
			selectedPrescription.medicines[medicineIndex].amount = medicine.amount;
			updatePrescription(selectedPrescription, setSelectedPrescription);
		}
	};

	const handleMedicineDelete = () => {
		const updatedMedicines = selectedPrescription.medicines.filter(
			(prescriptionMedicine) =>
				prescriptionMedicine.medicineId.toString() !== medicine._id.toString(),
		);
		selectedPrescription.medicines = updatedMedicines;
		updatePrescription(selectedPrescription, setSelectedPrescription);
	};

	return (
		<ListItem
		>
			<Grid container alignItems='center'>
				<Grid item xs={3}>
					<ListItemText primary={medicine.name} sx={{ marginRight: '8%' }} />
				</Grid>
				<Grid item xs={3}>
					<ListItemText primary={'Amount: ' + medicine.amount} />
				</Grid>
				{userType === 'doctor' && (
					<>
						<Grid item xs={2}>
							<Tooltip title='Increase amount'>
								<IconButton onClick={() => handleMedicineAmount(1)}>
									<Add />
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item xs={2}>
							<Tooltip title='Decrease amount'>
								<IconButton onClick={() => handleMedicineAmount(-1)}>
									<IconMinus />
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item xs={2}>
							<Tooltip title='Remove medicine'>
								<IconButton onClick={() => handleMedicineDelete()}>
									<Close />
								</IconButton>
							</Tooltip>
						</Grid>
					</>
				)}
			</Grid>
		</ListItem>
	);
}
