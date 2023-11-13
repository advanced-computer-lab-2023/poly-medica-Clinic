import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, CardContent, CardHeader, Card, TextField, Button, Divider, CardActions, } from '@mui/material';
import AccountProfile from './AccountProfile';
import DcotorAccountProfileDetails from './accountProfileDetails/DoctorAccountProfileDetails';
import PatientAccountProfileDetails from './accountProfileDetails/PatientAccountProfileDetails';
import { useUserContext } from 'hooks/useUserContext';
import { DOCTOR_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants';
import { useState } from 'react';
import Swal from 'sweetalert2';
import MedicalHistory from './MedicalHistory';
import { authenticationAxios } from '../../utils/AxiosConfig';
 
const Page = () => {


	const { user } = useUserContext();
	const [password, setPassword] = useState(''); 
	const handleChangePassword = async () => { 
		const response = await authenticationAxios.patch(`/change-password/${user.id}`, { password });
		try{
			if(response.status === 200){
				Swal.fire({
					icon: 'success',
					title: 'Success!',
					text: 'password changed successfully',
				});
				setPassword(''); 
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: response.response.data.message,
				}); 
			}
		} catch (err) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: response.response.data.message,
			}); 
		}

	};
	return (
		<> 
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8
				}}
			>
				<Container maxWidth="lg">
					<Stack spacing={3}>
						<div>
							<Typography variant="h4">
								Account
							</Typography>
						</div>
						<div>
							<Grid
								container
								spacing={3}
							>
								<Grid
									xs={12}
									md={6}
									lg={4}
								>
									<AccountProfile />
								</Grid>
								<Grid
									xs={12}
									md={6}
									lg={8}
								>
									{user.type == DOCTOR_TYPE_ENUM && <DcotorAccountProfileDetails />}
									{user.type == PATIENT_TYPE_ENUM && <PatientAccountProfileDetails />}

									<Card sx={{ mt: 5 }} >
										<CardHeader
											title='Change Password'
										/>
										<CardContent sx={{ width: '100%' }}>

											<Grid container sx={{ width: '100%' }} spacing={1} display={'flow'} flexDirection={'row'}>
												<Grid width={'50%'}>
													<TextField
														fullWidth
														label='password'
														name='password'
														type='password'
														onChange={(e) => setPassword(e.target.value)}
														required
														value={password}
													/>
												</Grid>
											</Grid>
											{/* </Box> */}
										</CardContent>
										<Divider />
										<CardActions sx={{ justifyContent: 'flex-end' }}>
											<Button
												variant='contained'
												type='submit'
												onClick={handleChangePassword} 
											>
												Save password
											</Button>
										</CardActions>
									</Card>
									{/* {user.type == ADMIN_TYPE_ENUM &&<PatientAccountProfileDetails />} */}
									{/* TODO: admin !! */}
									{/* here will be the gener */}
								</Grid>
								<Grid item xs={12}>
									<MedicalHistory />
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