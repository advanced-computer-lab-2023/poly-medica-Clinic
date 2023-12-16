import React, { useState, useEffect } from 'react';
import {
	List
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import DoctorPatientCard from './DoctorPatientCard';
import DoctorPatientDialog from './DoctorPatientDialog';
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
	const [selectedPatient, setSelectedPatient] = useState(null);
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
				(
					!filterData[0].selectedValue
					||
					(
						filterData[0].selectedValue === 'Finished'
						&&
						!isUpcomingAppointment(patient._id)
					)
					||
					(
						filterData[0].selectedValue === 'Upcoming'
						&&
						isUpcomingAppointment(patient._id)
					)
				),
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

	const handleDoctorPatientDetailsClose = () => {
		setSelectedPatient(null);
	};
	return (
		<MainCard title='Patients'>
			{isLoading ? (
				<>Loading...</>
			) : (
				<>
					<List>
						{Array.isArray(patients) &&
							patients.map((patient, index) => (
								<div key={index}>
									<DoctorPatientCard
										patient={patient}
										setSelectedPatient={setSelectedPatient}
									/>
								</div>
							))}
					</List>
					<DoctorPatientDialog
						selectedPatient={selectedPatient}
						handleDialogClose={handleDoctorPatientDetailsClose}
						loggedInDoctor={loggedInDoctor}
						setLoggedInDoctor={setLoggedInDoctor}
					/>
				</>
			)}
		</MainCard>
	);
};

export default Patients;
