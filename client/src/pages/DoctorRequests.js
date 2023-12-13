import React, { useState, useEffect } from 'react';
import DoctorRequestCard from './DoctorRequestCard';
import { clinicAxios } from '../utils/AxiosConfig';

const DoctorRequests = () => {
	const [doctorRequests, setDoctorRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		clinicAxios.get('/doctor-requests')
			.then((response) => {
				const data = response.data;
				setDoctorRequests(data.doctorRequests);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, []);

	const handleAccept = (doctorReq) => {
		// Delete the doctor request from the database
		clinicAxios.delete(
			`/doctor-requests/${doctorReq._id}?accept=${true}`
		)
			.then(() => {
				setDoctorRequests((prevDoctorRequests) =>
					prevDoctorRequests.filter(
						(doctorRequest) => doctorRequest._id !== doctorReq._id,
					),
				);
			})
			.catch((error) => {
				console.error('Error accepting doctor request:', error);
			});

		// Add the doctor to the doctor table
		clinicAxios.post('/doctors', JSON.stringify(doctorReq), {
			headers: { 'Content-Type': 'application/json' },
		})
			.then(() => {
				setDoctorRequests((prevDoctorRequests) =>
					prevDoctorRequests.filter(
						(doctorRequest) => doctorRequest._id !== doctorReq._id,
					),
				);
			})
			.catch((error) => {
				console.error('Error accepting doctor request:', error);
			});
	};

	const handleReject = (doctorReq) => {
		console.log('in handle reject doctor request');
		clinicAxios.delete(
			`/doctor-requests/${doctorReq._id}?accept=${false}`
		)
			.then(() => {
				setDoctorRequests((prevDoctorRequests) =>
					prevDoctorRequests.filter(
						(doctorRequest) => doctorRequest._id !== doctorReq._id,
					),
				);
			})
			.catch((error) => {
				console.error('Error rejecting doctor request:', error);
			});
	};

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					{doctorRequests.map((doctorRequest) => (
						<DoctorRequestCard
							key={doctorRequest._id}
							doctorReq={doctorRequest}
							onAccept={handleAccept}
							onReject={handleReject}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default DoctorRequests;
