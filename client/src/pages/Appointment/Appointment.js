import { useState, useEffect, useRef } from 'react';
import { clinicAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import AppointmentList from './AppointmentList.js';
import AppointmentOptions from './appointment-options/AppointmentOptions.js';
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
import { useSelector } from 'react-redux';


const Appointment = () => {
	const [appointments, setAppointments] = useState(null); // filtered and paginated appointments
	const [filteredAppointments, setFilteredAppointments] = useState([]); // all filtered appointments (initially all apointments)
	const [originalAppointments, setOriginalAppointments] = useState([]); // all appointments
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const [countPages, setCountPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0); // 0-indexed
	const isNormalRender = useRef(true);
	const { filterData, updateFilter } = useFilter();
	const { user } = useSelector(state => state.user);
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
				isNormalRender.current = true;
				setOriginalAppointments(resAppointments);
				updateFilter(APPOINTMENT_FILTER_ARRAY);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// to handle updating an appointment (reshedule/delete)
	const handleAppoinmentUpdate = (updatedAppointment) => {
		const updatedAppointments = originalAppointments.map((appointment) =>
			appointment._id === updatedAppointment._id ? updatedAppointment : appointment
		);
		isNormalRender.current = false;
		setOriginalAppointments(updatedAppointments);
	};
	
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
		const pageToRender = isNormalRender.current ? 0 : currentPage;
		paginate(resultAppointments, pageToRender);
		setCurrentPage(pageToRender);
		isNormalRender.current = true;
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
				setSelectedAppointment={setSelectedAppointment}
				handleDialogClose={handleDialogClose}
				handleAppoinmentUpdate={handleAppoinmentUpdate}
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
