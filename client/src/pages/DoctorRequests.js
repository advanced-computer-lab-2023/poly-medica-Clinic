import React, { useState, useEffect } from 'react';
import DoctorRequestCard from './DoctorRequestCard';

const DoctorRequests = () => {
	const [doctorRequests, setDoctorRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:8001/doctor-requests', {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
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
		fetch(
			`http://localhost:8001/doctor-requests/${doctorReq._id}?accept=${true}`,
			{
				method: 'DELETE',
			},
		)
			.then((response) => response.json())
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
		fetch('http://localhost:8001/doctors', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(doctorReq),
		})
			.then((response) => response.json())
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
		fetch(
			`http://localhost:8001/doctor-requests/${doctorReq._id}?accept=${false}`,
			{
				method: 'DELETE',
			},
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
