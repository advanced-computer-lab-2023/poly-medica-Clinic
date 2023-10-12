// DoctorRequestCard.js
import React from 'react';

const DoctorRequestCard = ({
	doctor,
	expanded,
	onExpand,
	onAccept,
	onReject,
}) => {
	return (
		<div className={`doctor-request-card ${expanded ? 'expanded' : ''}`}>
			<div className='doctor-name'>
				<h2>{doctor.name}</h2>
				<button onClick={onExpand}>{expanded ? 'Collapse' : 'Expand'}</button>
			</div>
			{expanded && (
				<div className='doctor-details'>
					<p>Speciality: {doctor.speciality}</p>
					<p>Hourly Rate: {doctor.hourlyRate}</p>
					<p>Affiliation: {doctor.affiliation}</p>
					<p>Educational Background: {doctor.educationalBackground}</p>
					<p>Available Slots: {doctor.availableSlots.join(', ')}</p>
					<div className='actions'>
						<button onClick={onAccept}>Accept</button>
						<button onClick={onReject}>Reject</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DoctorRequestCard;
