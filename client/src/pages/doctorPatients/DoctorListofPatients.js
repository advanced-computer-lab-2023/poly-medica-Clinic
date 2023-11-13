import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import PatientRow from './DoctorPatientRow';
import { useUserContext } from 'hooks/useUserContext';
import { useSearch } from 'contexts/SearchContext';
import { useFilter } from 'contexts/FilterContext';
import { clinicAxios } from 'utils/AxiosConfig';
const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [originalPatients, setOriginalPatients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [appointments, setAppointments] = useState([]);
	const [loggedInDoctor, setLoggedInDoctor] = useState(null);
	const { searchQuery } = useSearch();
	const { filterData, updateFilter } = useFilter();
	const { user } = useUserContext();
	const id = user.id;

	useEffect(() => {
		clinicAxios
			.get(`/appointments/${id}`)
			.then((response) => {
				setAppointments(response.data);
			})
			.catch((err) => console.log(err.message));
		clinicAxios
			.get('/doctors/' + id + '/patients')
			.then((response) => {
				const data = response.data;
				setPatients(data.finalListOFPatients);
				setOriginalPatients(data.finalListOFPatients);
				updateFilter([
					{
						attribute: 'Appointments',
						values: ['Upcoming', 'Finished'],
					},
				]);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, []);

	const isUpcomingAppointment = (id) => {
		for (let i = 0; i < appointments.length; i++) {
			const appointment = appointments[i];
			const currentDate = new Date();
			if (
				new Date(appointment.date) > currentDate &&
				appointment.patientId === id
			)
				return true;
		}
		return false;
	};

	useEffect(() => {
		const filteredPatients = originalPatients.filter(
			(patient) =>
				patient.name.includes(searchQuery) &&
				(!filterData[0].selectedValue ||
					filterData[0].selectedValue === 'Finished' ||
					(filterData[0].selectedValue === 'Upcoming' &&
						isUpcomingAppointment(patient._id))),
		);
		setPatients(filteredPatients);
	}, [originalPatients, searchQuery, filterData]);

	useEffect(() => {
		clinicAxios
			.get(`/doctor/${id}`)
			.then((response) => {
				setLoggedInDoctor(response.data.doctor);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<MainCard title='Patients'>
			{isLoading ? (
				<>Loading...</>
			) : (
				<div>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Date of Birth</TableCell>
									<TableCell>Gender</TableCell>
									<TableCell>Mobile Number</TableCell>
									<TableCell>Follow up</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Array.isArray(patients) &&
									patients.map((patient) => (
										<PatientRow
											key={patient._id}
											patient={patient}
											loggedInDoctor={loggedInDoctor}
										/>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			)}
		</MainCard>
	);
};

export default Patients;