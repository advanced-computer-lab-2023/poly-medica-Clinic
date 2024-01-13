import { useState, useEffect } from 'react';
import { clinicAxios } from 'pages/utilities/AxiosConfig';
import { Typography } from '@mui/material';
import AvailableSlotsList from './AvailableSlotsList.js';
import Swal from 'sweetalert2';
import '../../../assets/css/swalStyle.css';
import { useUserContext } from 'hooks/useUserContext';
import { PATIENT_TYPE_ENUM } from 'utils/Constants.js';
import { getDay, getTime } from '../../../utils/DateFormatter.js';
const AppointmentReschedule = ({
	selectedAppointment,
	setSelectedAppointment,
	setTabValue,
	handleAppoinmentUpdate,
}) => {
	const { user } = useUserContext();

	console.log('selectedAppointment', selectedAppointment);
	const [doctorAvailableSlots, setDoctorAvailableSlots] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		clinicAxios
			.get(`/doctor/${selectedAppointment.doctorId}`)
			.then((res) => {
				setDoctorAvailableSlots(res.data.doctor.availableSlots);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const handleReschedule = async (availableSlotsIdx) => {
		let userIdToNotify, notificationHead, notificationBody;
		if (user.type === PATIENT_TYPE_ENUM) {
			userIdToNotify = selectedAppointment.doctorId;
			notificationHead = 'Appointment Rescheduled';
			notificationBody = `Mr/Miss ${
				user.userName
			} has rescheduled the appointment to be on
                ${getDay(selectedAppointment.date)} at ${getTime(
				selectedAppointment.date,
			)}`;
		} else {
			userIdToNotify = selectedAppointment.patientId;
			notificationHead = 'Appointment Rescheduled';
			notificationBody = `Dr. ${
				user.userName
			} has rescheduled the appointment to be on
                ${getDay(selectedAppointment.date)} at ${getTime(
				selectedAppointment.date,
			)}`;
		}
		clinicAxios
			.patch(`/appointments/reschedule/${selectedAppointment._id}`, {
				doctorId: selectedAppointment.doctorId,
				availableSlotsIdx,
			})
			.then((response) => {
				Swal.fire(
					'Appointment Rescheduled!',
					'Your Appointment has been rescheduled successfully!',
					'success',
				).then(async () => {
					setTabValue('1');
					const updatedAppointment = response.data;
					setSelectedAppointment(updatedAppointment);
					handleAppoinmentUpdate(updatedAppointment);
					await clinicAxios.post(`/appointments/${userIdToNotify}`, {
						senderName: user.userName,
						notificationHead,
						notificationBody,
					});
				});
			})
			.catch((error) => {
				console.log(error);
			});
		console.log('availableSlotsIdx', availableSlotsIdx);
	};
	const handleConfirmation = (event) => {
		const availableSlotsIdx = parseInt(event.target.id);
		Swal.fire({
			title: 'Confirm Rescheduling',
			text: 'Are you sure you want to Reschedule this appointment?',
			icon: 'question',
			confirmButtonText: 'Yes',
			showCancelButton: 'true',
			cancelButtonText: 'No',
		}).then(async (result) => {
			if (result['isConfirmed']) {
				await handleReschedule(availableSlotsIdx);
			}
		});
	};
	return (
		<>
			{isLoading && <Typography>Loading...</Typography>}
			{!isLoading && doctorAvailableSlots.length != 0 && (
				<>
					<AvailableSlotsList
						availableSlots={doctorAvailableSlots}
						textOnButton='Reschedule Now'
						handleClick={handleConfirmation}
					/>
				</>
			)}
			{!isLoading && !doctorAvailableSlots.length && (
				<Typography>There are currently no available slots</Typography>
			)}
		</>
	);
};

export default AppointmentReschedule;
