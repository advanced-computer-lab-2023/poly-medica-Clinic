import { useState, useEffect } from 'react';
import { clinicAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import AppointmentList from './AppointmentList.js';
import AppointmentOptions from './AppointmentOptions/AppointmentOptions.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { useFilter } from 'contexts/FilterContext.js';
import {
	APPOINTMENT_FILTER_ARRAY,
	LIMIT_PER_PAGE
} from 'utils/Constants.js';
import {
	filterAppointmentsByDate,
	filterAppointmentByChronology
} from 'utils/AppointmentUtils.js';
import Pagination from '@mui/material/Pagination';


const Appointment = () => {
	const [appointments, setAppointments] = useState(null); // filtered and paginated appointments
	const [filteredAppointments, setFilteredAppointments] = useState([]); // all filtered appointments (initially all apointments)
	const [originalAppointments, setOriginalAppointments] = useState([]); // all appointments
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const [countPages, setCountPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0); // 0-indexed
	const { filterData, updateFilter } = useFilter();
	const { user } = useUserContext();
	const userId = user.id;
	
	const paginate = (allAppointments, requiredPage) => {
		const startIndex = requiredPage * LIMIT_PER_PAGE;
		const paginatedAppointments = allAppointments.slice(startIndex, startIndex+LIMIT_PER_PAGE);
		setAppointments(paginatedAppointments);
	};

	useEffect(() => {
		clinicAxios
			.get('/appointments/' + userId)
			.then((response) => {
				const resAppointments = response.data;
				setOriginalAppointments(resAppointments);
				setFilteredAppointments(resAppointments);
				updateFilter(APPOINTMENT_FILTER_ARRAY);
				setCountPages(Math.ceil(resAppointments.length/LIMIT_PER_PAGE));
				paginate(resAppointments, 0);
				console.log('appointments = ', resAppointments);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		const resultAppointments = originalAppointments.filter((appointment) =>
			(
				(!filterData[0].selectedValue || appointment.status.toString().toLowerCase() === filterData[0].selectedValue.toLowerCase())
				&&
				(!filterData[1].selectedValue || filterAppointmentsByDate(appointment, filterData[1].selectedValue))
				&&
				(!filterData[2].selectedValue || filterAppointmentByChronology(appointment, filterData[2].selectedValue))
			)
		);
		setFilteredAppointments(resultAppointments);
		setCountPages(Math.ceil(resultAppointments.length/LIMIT_PER_PAGE));
		paginate(resultAppointments, 0);
		setCurrentPage(0);
	}, [filterData, originalAppointments]);

	const handleDialogClose = () => {
		setSelectedAppointment(null);
	};

	const handlePageChange = (event, value) => {
		const requiredPage = value - 1;
		setCurrentPage(requiredPage);
		paginate(filteredAppointments, requiredPage);
	};

	return (
		<MainCard title='Appointments'>
			{appointments && <AppointmentList
				appointments={appointments}
				setSelectedAppointment={setSelectedAppointment}
				/>}
			<AppointmentOptions
				selectedAppointment={selectedAppointment}
				handleDialogClose={handleDialogClose}
				user={user}
			/>
			<Pagination
				count={countPages}
				page={currentPage+1}
				onChange={handlePageChange}
			/>
		</MainCard>

	);
};

export default Appointment;
