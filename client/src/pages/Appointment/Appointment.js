import { useState, useEffect } from 'react';
import { clinicAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import AppointmentList from './AppointmentList.js';
import AppointmentDetails from './AppointmentDetails.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { useFilter } from 'contexts/FilterContext.js';
import { APPOINTMENT_FILTER_ARRAY } from 'utils/Constants.js';
import {
	filterAppointmentsByDate,
	filterAppointmentByChronology
} from 'utils/AppointmentUtils.js';


const Appointment = () => {
	const [appointments, setAppointments] = useState(null);
	const [originalAppointments, setOriginalAppointments] = useState([]);
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const { filterData, updateFilter } = useFilter();
	const { user } = useUserContext();
	const userId = user.id;
	console.log({ userId });
	useEffect(() => {
		clinicAxios
			.get('/appointments/' + userId)
			.then((response) => {
				setAppointments(response.data);
				setOriginalAppointments(response.data);
				updateFilter(APPOINTMENT_FILTER_ARRAY);
				console.log('appoitments = ', response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		const filteredAppointments = originalAppointments.filter((appointment) =>
			(
				(!filterData[0].selectedValue || appointment.status.toString().toLowerCase() === filterData[0].selectedValue.toLowerCase())
				&&
				(!filterData[1].selectedValue || filterAppointmentsByDate(appointment, filterData[1].selectedValue))
				&&
				(!filterData[2].selectedValue || filterAppointmentByChronology(appointment, filterData[2].selectedValue))
			)
		);
		setAppointments(filteredAppointments);
	}, [filterData, originalAppointments]);

	const handleDialogClose = () => {
		setSelectedAppointment(null);
	};

	return (
		<MainCard title='Appointments'>
			{appointments && <AppointmentList
				appointments={appointments}
				setSelectedAppointment={setSelectedAppointment}
				/>}
			<AppointmentDetails
				selectedAppointment={selectedAppointment}
				handleDialogClose={handleDialogClose}
				user={user}
			/>
		</MainCard>
	);
};

export default Appointment;
