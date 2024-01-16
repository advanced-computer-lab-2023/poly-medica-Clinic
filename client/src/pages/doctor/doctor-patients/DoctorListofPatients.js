import React, { useEffect } from 'react';
import { List } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import DoctorPatientCard from './DoctorPatientCard';
import DoctorPatientDialog from './DoctorPatientDialog';
import { useSearch } from 'contexts/SearchContext';
import { useFilter } from 'contexts/FilterContext';
import { useLocation } from 'react-router-dom';
import { useDoctorContext } from 'hooks/useDoctorContext';
import { usePatientContext } from 'hooks/usePatientContext';
import { isUpcomingAppointment } from 'utils/DoctorUtils';
import { getAppointments, getDoctorPatients, getDoctor } from 'api/DoctorAPI';
import Loader from 'ui-component/Loader';
import { useSelector } from 'react-redux';
const Patients = () => {

	const location = useLocation();
	let redirectedPatient = '';
	if (location.state) {
		redirectedPatient = location.state.selectedPatient;
	}

	const { appointments, setAppointments, setLoggedInDoctor } = useDoctorContext();

	const { patients, setPatients, isLoading, setIsLoading, originalPatients, setOriginalPatients, setSelectedPatient } = usePatientContext();

	const { searchQuery } = useSearch();
	const { filterData, updateFilter } = useFilter();
	const { user } = useSelector(state => state.user);
	const id = user.id;

	useEffect(() => {
		getAppointments(id).then((response) => {
			setAppointments(response);
		});

		getDoctorPatients(id)
			.then((response) => {
				setPatients(response.finalListOFPatients);
				setOriginalPatients(response.finalListOFPatients);
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
		if (redirectedPatient) {
			setSelectedPatient(redirectedPatient);
		}
	}, []);

	useEffect(() => {
		const filteredPatients = originalPatients.filter(
			(patient) =>
				patient.name.includes(searchQuery) &&
				(!filterData[0].selectedValue ||
					(filterData[0].selectedValue === 'Finished' &&
						!isUpcomingAppointment(appointments, patient._id)) ||
					(filterData[0].selectedValue === 'Upcoming' &&
						isUpcomingAppointment(appointments, patient._id))),
		);
		setPatients(filteredPatients);
	}, [originalPatients, searchQuery, filterData]);

	useEffect(() => {
		getDoctor(id)
			.then((response) => {
				setLoggedInDoctor(response.doctor);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<MainCard title='Patients'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<List>
						{Array.isArray(patients) &&
							patients.map((patient, index) => (
								<div key={index}>
									<DoctorPatientCard patient={patient} />
								</div>
							))}
					</List>
					<DoctorPatientDialog />
				</>
			)}
		</MainCard>
	);
};
export default Patients;
