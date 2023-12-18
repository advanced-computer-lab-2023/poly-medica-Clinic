import {
	Box,
	Container,
	Stack,
	Typography,
	Unstable_Grid2 as Grid,
	CardContent,
	CardHeader,
	Card,
	TextField,
	Button,
	Divider,
	CardActions,
	FormControl,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountProfile from './AccountProfile';
import DcotorAccountProfileDetails from './accountProfileDetails/DoctorAccountProfileDetails';
import PatientAccountProfileDetails from './accountProfileDetails/PatientAccountProfileDetails';
import { useUserContext } from 'hooks/useUserContext';
import { DOCTOR_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants';
import { useState } from 'react';
import Swal from 'sweetalert2';
import MedicalHistory from './MedicalHistory';
import { authenticationAxios } from '../../utils/AxiosConfig';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

import DoctorContract from '../DoctorContract';
const Page = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { patientId } = useParams();
	const { user } = useUserContext();
	const [password, setPassword] = useState('');
	const [strength, setStrength] = useState(0);
	const [level, setLevel] = useState();
	const isDoctor = user.type === DOCTOR_TYPE_ENUM;
	const doctorInPatientProfile = patientId && isDoctor;
	let selectedPatient = '';
	if(location.state){
		selectedPatient = location.state.selectedPatient;
	}

	const submitPassword = async () => {
		if (!level || level.label != 'Strong') {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Please enter a Strong password. \n Password must be at least 8 characters and include one number, one letter, one capital letter, and one special character.',
			});
			return;
		}
		try {
			await authenticationAxios.patch(`/change-password/${user.id}`, {
				password,
			});

			Swal.fire({
				icon: 'success',
				title: 'Success!',
				text: 'password changed successfully',
			});
			setPassword('');
			const temp = strengthIndicator('');
			setStrength(temp);
			setLevel(strengthColor(temp));
		} catch (err) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: err.response.data.message,
			});
		}
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
		const temp = strengthIndicator(e.target.value);
		setStrength(temp);
		setLevel(strengthColor(temp));
	};
	return (
		<>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth='lg'>
					<Stack spacing={3}>
						{!patientId && (
							<div>
								<Typography variant='h4'>Account</Typography>
							</div>
						)}
						<div>
							{doctorInPatientProfile && (
								<Button variant="outlined" startIcon={<ArrowBackIcon />} color='secondary' onClick={() => { navigate('/doctor/pages/my-patients', { state: { selectedPatient } }); }}
									sx={{ mb:1.5 }}
								>
									Back to my patients
								</Button>
							)}
							<Grid container spacing={3}>



								<Grid Stack xs={12} md={6} lg={4}>
									<Grid item xs={6} > {!patientId && <AccountProfile />} </Grid>
									{isDoctor && !patientId && <Grid item xs={6} sx={{ marginTop: '10%' }}>
										<Card sx={{ padding: '4%' }} > <CardHeader title="Employment Contract" />
											<DoctorContract />
										</Card>
									</Grid>}
									{(user.type == PATIENT_TYPE_ENUM || patientId) && (
										<Grid item xs={6} sx={{ marginTop: patientId ? '0' : '10%' }}>
											<MedicalHistory patientId={patientId} />
										</Grid>
									)}

								</Grid>
								<Grid xs={12} md={6} lg={8}>
									{isDoctor && !patientId && (
										<DcotorAccountProfileDetails />
									)}
									{(user.type == PATIENT_TYPE_ENUM || patientId) && (
										<PatientAccountProfileDetails />
									)}

									{!doctorInPatientProfile && (
										<Card sx={{ mt: 5 }}>
											<CardHeader title='Change Password' />
											<CardContent sx={{ width: '100%' }}>
												<Grid
													container
													sx={{ width: '100%' }}
													spacing={1}
													display={'flow'}
													flexDirection={'row'}
												>
													<Grid width={'50%'}>
														<TextField
															fullWidth
															label='password'
															name='password'
															type='password'
															onChange={handleChangePassword}
															required
															value={password}
														/>
														{strength !== 0 && (
															<FormControl fullWidth>
																<Box sx={{ mb: 2 }}>
																	<Grid
																		container
																		spacing={2}
																		alignItems='center'
																	>
																		<Grid item>
																			<Box
																				style={{
																					backgroundColor: level?.color,
																				}}
																				sx={{
																					width: 85,
																					height: 8,
																					borderRadius: '7px',
																				}}
																			/>
																		</Grid>
																		<Grid item>
																			<Typography
																				variant='subtitle1'
																				fontSize='0.75rem'
																			>
																				{level?.label}
																			</Typography>
																		</Grid>
																	</Grid>
																</Box>
															</FormControl>
														)}
													</Grid>
												</Grid>
											</CardContent>
											<Divider />
											<CardActions sx={{ justifyContent: 'flex-end' }}>
												<Button
													variant='contained'
													type='submit'
													onClick={submitPassword}
												>
													Save password
												</Button>
											</CardActions>
										</Card>
									)}
									{/* {user.type == ADMIN_TYPE_ENUM &&<PatientAccountProfileDetails />} */}
									{/* TODO: admin !! */}
									{/* here will be the gener */}
								</Grid>
							</Grid>
						</div>
					</Stack>
				</Container>
			</Box>
		</>
	);
};

export default Page;
