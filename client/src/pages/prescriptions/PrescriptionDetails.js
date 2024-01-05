import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	IconButton,
	List,
	Divider,
	Tooltip
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MedicineCard from './MedicineCard';
import { AddCircle } from '@mui/icons-material';
import { formatMedicines } from '../../utils/PrescriptionUtils';
import { OK_STATUS_CODE } from 'utils/Constants';
import { patientAxios } from 'utils/AxiosConfig';
import { AddMedicine } from './AddMedicine';
import { useSelector } from 'react-redux';
const PrescriptionDetails = ({
	selectedPrescription,
	setSelectedPrescription,
	prescriptionDoctor,
	handleDialogClose,
	medicines,
}) => {
	const { user } = useSelector(state => state.user);
	const [addMode, setAddMode] = useState(false);
	const [selectedMedicine, setSelectedMedicine] = useState(null);
	const formattedMedicines = formatMedicines(medicines, selectedPrescription);

	const handleAddClick = () => {
		setAddMode(true);
	};

	const handleSaveClick = () => {
		if (selectedMedicine) {
			selectedPrescription.medicines.push({
				amount: 1,
				name: selectedMedicine.name,
				medicineId: selectedMedicine._id,
				price: selectedMedicine.price,
			});
			patientAxios
				.patch(`/prescriptions/${selectedPrescription._id}`, {
					prescription: selectedPrescription,
				})
				.then((response) => {
					if (response.status === OK_STATUS_CODE) {
						setSelectedPrescription(response.data);
						setAddMode(false);
					}
				});
		}
	};

	const handleCancelClick = () => {
		setAddMode(false);
	};
	return (
		<Dialog
			open={selectedPrescription}
			onClose={handleDialogClose}
			PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}
		>
			{selectedPrescription && prescriptionDoctor && (
				<>
					<DialogContent>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}
						>
							<Typography variant='h4'>{`Dr. ${prescriptionDoctor.userData.name}`}</Typography>
							<Typography variant='body1'>{`${prescriptionDoctor.speciality} Clinic`}</Typography>
						</div>
						<Typography variant='subtitle1'>Date:</Typography>
						<Typography variant='body1'>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								{dayjs(selectedPrescription.date).format('LL')}
							</LocalizationProvider>
						</Typography>
						<Typography variant='subtitle1'>Filled:</Typography>
						<Typography variant='body1'>
							{selectedPrescription.filled ? 'Yes' : 'No'}
						</Typography>
						<Typography sx={{ marginBottom: '2%' }} variant='subtitle1'>
							Medicines:
						</Typography>

						<List>
							{formattedMedicines.map((medicine, index) => (
								<>
									<MedicineCard
										key={index}
										medicine={medicine}
										selectedPrescription={selectedPrescription}
										setSelectedPrescription={setSelectedMedicine}
										userType={user.type}
									/>
									<Divider />
								</>
							))}
						</List>
						{user.type === 'doctor' && !selectedPrescription.filled && (
							<>
								{addMode ? (
									<AddMedicine
										medicines={medicines}
										selectedMedicine={selectedMedicine}
										setSelectedMedicine={setSelectedMedicine}
										handleSaveClick={handleSaveClick}
										handleCancelClick={handleCancelClick}
									/>
								) : (
									<Tooltip title='Add medicine'>
										<IconButton
											onClick={handleAddClick}
											color='primary'
											sx={{ height: '100%', width: '100%' }}
										>
											<AddCircle />
										</IconButton>
									</Tooltip>
								)}
							</>
						)}

						<Typography sx={{ marginTop: '5%' }} variant='subtitle1'>
							Description:
						</Typography>
						<Typography variant='body1'>
							{selectedPrescription.description}
						</Typography>
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

export default PrescriptionDetails;
