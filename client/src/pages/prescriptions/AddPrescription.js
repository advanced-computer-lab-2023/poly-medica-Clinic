import React, { useState } from 'react';

import {
	Dialog,
	DialogTitle,
	TextField,
	DialogContent,
	DialogActions,
	Button,
} from '@mui/material';

const AddPrescription = ({
	isAddDialogOpen,
	handleConfirmAdd,
	handleCancelAdd,
	setDescription,
}) => {
	const [isEmptyDescription, setIsEmptyDescription] = useState(true);

	return (
		<Dialog
			open={isAddDialogOpen}
			onClose={() => {
				setIsEmptyDescription(true);
				handleCancelAdd();
			}}
		>
			<DialogTitle>Add Prescription</DialogTitle>
			<DialogContent>
				<TextField
					label='description'
					fullWidth
					onChange={(e) => {
						setIsEmptyDescription(e.target.value === '');
						setDescription(e.target.value);
					}}
					margin='normal'
					required
				/>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						setIsEmptyDescription(true);
						handleCancelAdd();
					}}
					color='primary'
				>
					Cancel
				</Button>
				<Button
					onClick={(e) => {
						setIsEmptyDescription(true);
						handleConfirmAdd(e);
					}}
					color='primary'
					variant='contained'
					disabled={isEmptyDescription}
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddPrescription;
