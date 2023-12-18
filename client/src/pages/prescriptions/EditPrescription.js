import React, { useState } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	FormControl,
	CircularProgress,
} from '@mui/material';

const EditPrescription = ({
	isEditDialogOpen,
	setIsEditDialogOpen,
	setSelectedEditPrescription,
	handleSaveEdit,
	selectedEditPrescription,
	editErrorMessage,
	setEditErrorMessage,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Dialog
			open={isEditDialogOpen}
			onClose={() => {
				setIsLoading(false);
				setIsEditDialogOpen(false);
				setTimeout(() => {
					setEditErrorMessage('');
				}, 1000);
			}}
		>
			<DialogTitle>Edit Prescription</DialogTitle>
			<DialogContent>
				{selectedEditPrescription && (
					<form
						onSubmit={(e) => {
							setIsLoading(true);
							handleSaveEdit(e);
							setTimeout(() => {
								setIsLoading(false);
							}, 2000);
						}}
						id='editPrescriptionForm'
					>
						<FormControl required fullWidth>
							<TextField
								fullWidth
								label='Description'
								name='description'
								variant='outlined'
								margin='normal'
								value={selectedEditPrescription.description}
								onChange={(e) =>
									setSelectedEditPrescription({
										...selectedEditPrescription,
										description: e.target.value,
									})
								}
								required
							/>
						</FormControl>
						{editErrorMessage && (
							<p style={{ color: 'red' }}>{editErrorMessage}</p>
						)}
					</form>
				)}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						setIsLoading(false);
						setIsEditDialogOpen(false);
						setTimeout(() => {
							setEditErrorMessage('');
						}, 1000);
					}}
					color='secondary'
				>
					Cancel
				</Button>
				{isLoading ? (
					<CircularProgress size={24} />
				) : (
					<Button type='submit' color='primary' form='editPrescriptionForm'>
						Save
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default EditPrescription;
