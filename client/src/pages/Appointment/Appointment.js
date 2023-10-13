import { useState, useEffect } from 'react';
import { clinicAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import AppointmentList from './AppointmentList.js';
import AppointmentDetails from './AppointmentDetails.js';

const Appointment = () => {
	const [appointments, setAppointments] = useState([]);
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const userId = '652704ba188f4ee2976751fc';
	useEffect(() => {
		clinicAxios
			.get('/appointments/' + userId)
			.then((response) => {
				setAppointments(response.data);
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
