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

 
const Patients = () => {
	const [finalListOFPatients, setPatients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	

	useEffect(() => {
		fetch('http://localhost:8001/doctors/65228c39b5e8bef73ca7ca83/patients')
			.then((response) => response.json())
			.then((data) => {
				setPatients(data.finalListOFPatients);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
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
								</TableRow>
							</TableHead>
							<TableBody>
								{Array.isArray(finalListOFPatients) &&
									finalListOFPatients.map((patient) => (
										<PatientRow  
											key={patient._id}
											patient={patient} 
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
