import React, { useState } from 'react';
import {
	Typography,
} from '@mui/material';
import Swal from 'sweetalert2';
import '../../../assets/css/swalStyle.css';
import { useDoctorContext } from 'hooks/useDoctorContext.js';
import { getTitle } from 'utils/CommonUtils.js';
import { addAppointment } from 'api/DoctorAPI.js';
import { showSuccessAlert } from 'utils/swal.js';
import { usePatientContext } from 'hooks/usePatientContext.js';
import AvailableSlotsList from '../../../ui-component/AvailableSlotsList.js';

const FollowUp = () => {
	const { loggedInDoctor, setLoggedInDoctor } = useDoctorContext();
	const { selectedPatient } = usePatientContext();
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
