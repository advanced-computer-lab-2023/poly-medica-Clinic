import React, { useEffect, useState } from 'react';
import { 
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
	} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { clinicAxios } from '../../utils/AxiosConfig';



const PrescriptionItem = ({ prescription, handleClicking }) => {
	const [doctor, setDoctor] = useState({});
	const [Loading, setLoading] = useState(true);
	useEffect(() => {
		try{
			const getDoctor = () => {
				clinicAxios.get(`doctor/${prescription.doctorId}`)
					.then((responseClinic) => {
						setDoctor(responseClinic.data.doctor);
						setLoading(false);
					})
					.catch((err) => {
						console.log(err);
						setLoading(false);
					});
			};
			getDoctor();
		}
		catch(err){
			console.log(err);
		}
	}, [prescription]);
	if(Loading){
		return (
			<>
				<Typography variant="h5">Loading...</Typography>
			</>
		);
	}
	else{
		return (
			<>
				<ListItem button onClick={ () => handleClicking(prescription, doctor) }>
					<ListItemAvatar sx={{ paddingRight: '2%' }}>
						<img width="80" height="80" />
					</ListItemAvatar>

					{console.log(doctor.specialty)}
					<ListItemText primary={`Dr. ${doctor.userData.name}`} secondary={
						<div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
							{
								prescription.filled?
									<CheckIcon >
										Filled
									</CheckIcon>
								:
									<CloseIcon>
										Not Filled
									</CloseIcon>
							}
							{prescription.filled? 'Filled' : 'Not Filled'}
						</div>
					} sx={{
						width: '60%',
						lineHeight: '1.5em',
						maxHeight: '3em',
					}} />

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<ListItemText secondary={
							dayjs(prescription.date).format('LL')
						} sx={{
							width: '60%',
							lineHeight: '1.5em',
							maxHeight: '3em',
						}} />
						{/* <Typography variant="h5" sx={{ paddingLeft: '2%', align:'center' }}> {dayjs(prescription.date).format('LL')} </Typography> */}
					</LocalizationProvider>
				</ListItem>
			</>
		);
	}
};

export default PrescriptionItem;