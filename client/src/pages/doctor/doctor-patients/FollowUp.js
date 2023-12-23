import React, { useState } from 'react';
import {
	Button,
	Typography,
	Grid,
	Card,
	CardContent,
} from '@mui/material';
import { getDay, getTime } from '../../../utils/DateFormatter.js';
import Swal from 'sweetalert2';
import '../../../assets/css/swalStyle.css';
import { useDoctorContext } from 'hooks/useDoctorContext.js';
import { getTitle } from 'utils/CommonUtils.js';
import { addAppointment } from 'api/DoctorAPI.js';
import { showSuccessAlert } from 'utils/swal.js';

const FollowUp = () => {
	const { selectedPatient, loggedInDoctor, setLoggedInDoctor } = useDoctorContext();

	const title = getTitle(selectedPatient);

	const [availableSlots, setAvailableSlots] = useState(
		loggedInDoctor.availableSlots,
	);
	const handleSchedule = async (availableSlotsIdx) => {
		const slot = availableSlots[availableSlotsIdx];
		const appointment = {
			patientId: selectedPatient._id,
			doctorId: loggedInDoctor._id,
			patientName: selectedPatient.userName,
			doctorName: loggedInDoctor.userData.name,
			date: slot.from,
			status: 'Incomplete',
			type: 'follow-up',
			availableSlotsIdx,
		};
		addAppointment(appointment)
			.then(() => {
				showSuccessAlert('Follow up Schedule!', 'Your Follow up has been scheduled successfully!', () => {
					const newAvailableSlots = availableSlots.filter((slot, index) => index !== availableSlotsIdx);
					setAvailableSlots(newAvailableSlots);
					setLoggedInDoctor(oldDoctor => {
						const newDoctor = oldDoctor;
						newDoctor.availableSlots = newAvailableSlots;
						return newDoctor;
					});
				});
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
			cancelButtonText: 'No',
		}).then(async (result) => {
			if (result['isConfirmed']) {
				await handleSchedule(parseInt(event.target.id));
			}
		});
	};

	return (
		<>
			{
				selectedPatient &&
				<Typography
					align='center'
					variant='h4'
					sx={{ marginBottom: '3em' }}
				>
					{`Schedule a follow-up for ${title} ${selectedPatient.name}`}
				</Typography>
			}

			{(selectedPatient && (!availableSlots || !availableSlots.length)) && (
				<Typography align='center' variant='subtitle1'>
					{' '}
					Sorry, There are no available slots
				</Typography>
			)}
			{
				selectedPatient &&
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{Array.isArray(availableSlots) &&
						availableSlots.length > 0 &&
						availableSlots.map((slot, index) => (
							<Grid item key={index} xs={4} sm={6}>
								<Card
									sx={{
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
											textAlign: 'center',
										}}
									>
										<Typography sx={{ mb: 1.5 }} variant='h5'>
											{getDay(slot.from)}
										</Typography>

										<Typography component='h6' color='text.primary'>
											{`From : ${getTime(slot.from)}`}
										</Typography>
										<Typography
											component='h6'
											color='text.primary'
											sx={{ mb: '1.5em' }}
										>
											{`To : ${getTime(slot.until)}`}
										</Typography>

										<Button
											id={index}
											size='small'
											variant='text'
											color='primary'
											onClick={handleConfirmation}
										>
											Schedule Now
										</Button>
									</CardContent>
								</Card>
							</Grid>
						))}
				</Grid>
			}
		</>
	);
};

export default FollowUp;
