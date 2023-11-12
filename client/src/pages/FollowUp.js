import React from 'react';
import {
	Dialog,
    DialogTitle,
	DialogContent,
	DialogActions,
	Button,
    Typography,
	Grid,
	Card,
	CardContent
} from '@mui/material';
import { getDay, getTime } from '../utils/DateFormatter.js';
import { doctorAxios } from 'pages/utilities/AxiosConfig';
import Swal from 'sweetalert2';
import '../assets/css/swalStyle.css';


const FollowUp = ({
    isFollowUpOpen,
    handleClose,
    selectedPatient,
    loggedInDoctor
}) => {
	const { availableSlots } = loggedInDoctor;
	const handleSchedule = async (availableSlotsIdx) => {
		console.log('availableSlotsIdx', availableSlotsIdx);
		const slot = availableSlots[availableSlotsIdx];
		const appointment = {
            patientId: selectedPatient._id,
            doctorId: loggedInDoctor._id,
            patientName: selectedPatient.userName,
            doctorName: loggedInDoctor.userData.name,
            date: slot.from,
            status: 'active',
            type: 'follow-up',
            availableSlotsIdx
        };
        await doctorAxios
                .post('/appointments', appointment)
                .then(() => {
                    Swal.fire(
                        'Follow up Schedule!',
                        'Your Follow up has been scheduled successfully!',
                        'success'
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
	};
	const handleConfirmation = (event) => {
		Swal.fire({
			title: 'Confirm Scheduling',
			text: 'Are you sure you want to schedule this follow-up?',
			icon: 'question',
			confirmButtonText: 'Yes',
			showCancelButton: 'true',
			cancelButtonText: 'No'
		})
		.then( async (result) => {
			if (result['isConfirmed']){
				await handleSchedule(parseInt(event.target.id));
			}
		});
	};

    return (
		<Dialog 
			open={isFollowUpOpen} 
			onClose={handleClose} 
			PaperProps={{ sx: 
				{ minWidth: window.outerWidth > 800 ? 700 : 500 } 
			}}  
		>
			{(
				<>
					<DialogTitle align='center' variant='h2' >
						Schedule a Follow Up
					</DialogTitle>
                    <DialogContent>
						<Typography align='center' variant='h4' sx={{ marginBottom: '3em' }}>{`Patient: ${selectedPatient.userName}`}</Typography>
						{(!availableSlots || !availableSlots.length) && 
							<Typography align='center' variant='subtitle1'> Sorry, There are no available slots</Typography>
						}
						<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

							{Array.isArray(availableSlots) && availableSlots.length > 0 
								&& availableSlots.map((slot, index) => (
								<Grid item key={index} xs={4} sm={6}>
									<Card 
										sx = {{ 
											backgroundColor: (theme) =>
												theme.palette.mode === 'light'
													? theme.palette.grey[200]
													: theme.palette.grey[700],
										}}
									>
										<CardContent 
											sx={{ 
												display: 'flex', 
												justifyContent: 'center', 
												flexDirection: 'column', 
												textAlign: 'center' 
											}}
										>
											<Typography sx={{ mb: 1.5 }} variant="h5">
												{getDay(slot.from)}
											</Typography>

											<Typography component="h6" color="text.primary">
													{`From : ${getTime(slot.from)}`}
											</Typography>
											<Typography component="h6" color="text.primary" sx={{ mb: '1.5em' }}>
													{`To : ${getTime(slot.until)}`}
											</Typography>
											
											<Button
												id={index}
												size="small" 
												variant="text" 
												color="primary"
												onClick={handleConfirmation}
											>
												Schedule Now
											</Button>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
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
