import React, { useState } from 'react';
import { Typography } from '@mui/material';
import AvailableSlotsList from '../../ui-component/AvailableSlotsList.js';
import { doctorAxios } from 'pages/utilities/AxiosConfig';
import Swal from 'sweetalert2';
import '../../assets/css/swalStyle.css';

const FollowUp = ({ selectedPatient, loggedInDoctor, setLoggedInDoctor }) => {
	let title = '';
    if(selectedPatient){
        title = (selectedPatient.gender=='MALE')? 'Mr.':'Miss.';
    }

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
		await doctorAxios
			.post('/appointments', { items: appointment })
			.then(() => {
				Swal.fire(
					'Follow up Schedule!',
					'Your Follow up has been scheduled successfully!',
					'success',
				)
				.then(() => {
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

			{( selectedPatient && (!availableSlots || !availableSlots.length)) && (
				<Typography align='center' variant='subtitle1'>
					{' '}
					Sorry, There are no available slots
				</Typography>
			)}
			{
				selectedPatient &&
				<AvailableSlotsList
					availableSlots={availableSlots}
					textOnButton='Schedule Now'
					handleClick={handleConfirmation}
				/>
			}
		</>
	);
};

export default FollowUp;
