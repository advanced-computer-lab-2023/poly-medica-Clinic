import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
} from '@mui/material';

const DoctorRequestCard = ({ doctorReq, onAccept, onReject }) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<Card>
			<CardHeader title={doctorReq.userData.name} />
			<CardActions>
				<Button variant='contained' color='primary' onClick={handleExpand}>
					{expanded ? 'Collapse' : 'Expand'}
				</Button>
			</CardActions>
			<Accordion expanded={expanded}>
				<AccordionSummary>
					<Typography>Doctor Details</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<CardContent>
						<Typography>Email: {doctorReq.userData.email}</Typography>
						<Typography>
							Date of Birth: {doctorReq.userData.dateOfBirth}
						</Typography>
						<Typography>Speciality: {doctorReq.speciality}</Typography>
						<Typography>Hourly Rate: {doctorReq.hourlyRate}</Typography>
						<Typography>Affiliation: {doctorReq.affiliation}</Typography>
						<Typography>
							Educational Background: {doctorReq.educationalBackground}
						</Typography>
					</CardContent>
					<CardActions>
						<Button variant='contained' color='primary' onClick={onAccept}>
							Accept
						</Button>
						<Button variant='contained' color='secondary' onClick={onReject}>
							Reject
						</Button>
					</CardActions>
				</AccordionDetails>
			</Accordion>
		</Card>
	);
};

export default DoctorRequestCard;
