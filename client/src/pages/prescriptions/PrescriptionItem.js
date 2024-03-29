import React, { useEffect, useState } from 'react';
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	IconButton,
	Tooltip,
} from '@mui/material';
import { getDoctor } from 'api/DoctorAPI';
import { Edit as EditIcon } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import prescrptionImage from '../utilities/prescription.png';
import { PATIENT_BASE_URL } from 'utils/Constants';
import { useSelector } from 'react-redux';

const PrescriptionItem = ({
	prescription,
	handleClicking,
	handleEditButtonClick,
}) => {
	const { user } = useSelector(state => state.user);
	const [doctor, setDoctor] = useState({});
	const [Loading, setLoading] = useState(true);
	useEffect(() => {
		try {
			const fetchDoctor = () => {
				getDoctor(prescription.doctorId)
					.then((responseClinic) => {
						setDoctor(responseClinic.doctor);
						setLoading(false);
					})
					.catch(() => {
						setLoading(false);
					});
			};
			fetchDoctor();
		} catch (err) {
			console.log(err);
		}
	}, [prescription]);
	if (Loading) {
		return <Typography variant='h5'>Loading...</Typography>;
	} else {
		return (
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
				</LocalizationProvider>

				{user.type === 'doctor' && !prescription.filled && (
					<IconButton
						edge='end'
						aria-label='edit'
						onClick={(event) => handleEditButtonClick(prescription, event)}
						sx={{ marginRight: '2%' }}
					>
						<EditIcon />
					</IconButton>
				)}

				<Tooltip title='download'>
					<a
						href={`${PATIENT_BASE_URL}/prescriptions/${prescription._id}/download`}
						target='_blank'
						rel='noreferrer'
						download={`${prescription._id}.pdf`}
					>
						<IconButton
							edge='end'
							aria-label='download'
							onClick={(e) => e.stopPropagation()}
						>
							<FileDownloadIcon />
						</IconButton>
					</a>
				</Tooltip>
			</ListItem>
		);
	}
};

export default PrescriptionItem;
