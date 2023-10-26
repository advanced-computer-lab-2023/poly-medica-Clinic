
import React from 'react';
import {
	Dialog,
    DialogTitle,
	DialogContent,
	DialogActions,
	Button,
    Typography,
} from '@mui/material';

const FollowUp = ({
    isFollowUpOpen,
    handleClose,
    selectedPatient,
    loggedInDoctor
}) => {
    
    return (
		<Dialog open={isFollowUpOpen} onClose={handleClose} PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}  >
			{ (
				<>
					<DialogTitle align='center' variant='h4'> Follow Up </DialogTitle>
                    <DialogContent>
						<Typography variant="subtitle1">Patient Name:</Typography>
                        <Typography variant="body">{ selectedPatient.name }</Typography>
						<Typography variant="subtitle1">Doctor Name:</Typography>
                        <Typography variant="body">{ loggedInDoctor.userData.name }</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
                            Close
						</Button>
					</DialogActions>
				</>
			)}
		</Dialog>
	);
};

export default FollowUp;
