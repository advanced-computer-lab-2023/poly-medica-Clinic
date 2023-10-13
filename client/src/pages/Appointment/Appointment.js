import { useState, useEffect } from 'react';
import { clinicAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import AppointmentList from './AppointmentList.js';
import AppointmentDetails from './AppointmentDetails.js';
import { useUserContext } from 'hooks/useUserContext.js';
const Appointment = () => {
	const [appointments, setAppointments] = useState([]);
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const { user } = useUserContext();
	const userId = user.id;
	useEffect(() => {
		clinicAxios
			.get('/appointments/' + userId)
			.then((response) => {
				setAppointments(response.data);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleDialogClose = () => {
		setSelectedAppointment(null);
	};

	return (
		<MainCard title='Appointments'>
			<AppointmentList
				appointments={appointments}
				setSelectedAppointment={setSelectedAppointment}
			/>
			<AppointmentDetails
				selectedAppointment={selectedAppointment}
				handleDialogClose={handleDialogClose}
			/>
		</MainCard>
	);
};

export default Appointment;
