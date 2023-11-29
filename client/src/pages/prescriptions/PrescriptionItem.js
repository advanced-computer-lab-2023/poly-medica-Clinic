import React, { useEffect, useState } from 'react';
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	IconButton,
	Tooltip,
} from '@mui/material';

import { Edit as EditIcon } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import prescrptionImage from '../utilities/prescription.png';
import { clinicAxios } from '../../utils/AxiosConfig';
import { useUserContext } from 'hooks/useUserContext';
import { PATIENT_BASE_URL } from 'utils/Constants';

const PrescriptionItem = ({
	prescription,
	handleClicking,
	handleEditButtonClick,
}) => {
	const { user } = useUserContext();
	const [doctor, setDoctor] = useState({});
	const [Loading, setLoading] = useState(true);
	useEffect(() => {
		try {
			const getDoctor = () => {
				clinicAxios
					.get(`doctor/${prescription.doctorId}`)
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
		} catch (err) {
			console.log(err);
		}
	}, [prescription]);
	if (Loading) {
		return <Typography variant='h5'>Loading...</Typography>;
	} else {
		return (
			<>
				<ListItem button onClick={() => handleClicking(prescription, doctor)}>
					<ListItemAvatar sx={{ paddingRight: '2%' }}>
						<img src={prescrptionImage} width='80' height='80' />
					</ListItemAvatar>
					<ListItemText
						primary={`Dr. ${doctor.userData.name}`}
						secondary={
							<div
								style={{
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
								}}
							>
								{prescription.filled ? (
									<CheckIcon>Filled</CheckIcon>
								) : (
									<CloseIcon>Not Filled</CloseIcon>
								)}
								{prescription.filled ? 'Filled' : 'Not Filled'}
							</div>
						}
						sx={{
							width: '60%',
							lineHeight: '1.5em',
							maxHeight: '3em',
						}}
					/>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<ListItemText
							secondary={dayjs(prescription.date).format('LL')}
							sx={{
								width: '60%',
								lineHeight: '1.5em',
								maxHeight: '3em',
							}}
						/>
						{/* <Typography variant="h5" sx={{ paddingLeft: '2%', align:'center' }}> {dayjs(prescription.date).format('LL')} </Typography> */}
					</LocalizationProvider>

					{user.type === 'doctor' && (
						<IconButton
							edge='end'
							aria-label='edit'
							onClick={(event) => handleEditButtonClick(prescription, event)}
						>
							<EditIcon />
						</IconButton>
					)}

					{user.type === 'patient' && (
						<Tooltip title='download'>
							<a
								href={`${PATIENT_BASE_URL}/prescriptions/${prescription._id}/download`}
								target='_blank'
								rel='noreferrer'
								download={`${prescription._id}.pdf`}
							>
								<IconButton edge='end' aria-label='download'>
									<FileDownloadIcon />
								</IconButton>
							</a>
						</Tooltip>
					)}
				</ListItem>
			</>
		);
	}
};

export default PrescriptionItem;
