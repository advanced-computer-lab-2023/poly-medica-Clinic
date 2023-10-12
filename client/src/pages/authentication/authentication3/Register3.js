import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Button } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import PatientRegister from '../auth-forms/PatientRegister';
import DoctorPharmaRegister from '../auth-forms/DoctorPharmaRegister';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { useState } from 'react';

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
	const [selectedButton, setSeletcedButton] = useState(null);

	return (
		<AuthWrapper1>
			<Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
						<Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
							<AuthCardWrapper>
								<Grid container spacing={2} alignItems="center" justifyContent="center">
									<Grid item sx={{ mb: 3 }}>
										<Link to="#">
											<Logo />
										</Link>
									</Grid>
									<Grid item xs={12}>
										<Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
											<Grid item>
												<Stack alignItems="center" justifyContent="center" spacing={1}>
													<Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            Sign up as
													</Typography>
													<Grid container display={'flex'} flexDirection={'row'} spacing={2}>
														<Grid item>
															<Button sx={{ color: (selectedButton=='patient'?'white':'#4CAF50'), borderRadius:5, backgroundColor: (selectedButton=='patient'?'#4CAF50':'#FFFFFF') }} variant={selectedButton=='patient'?'contained':'outlined'} size='small' onClick={ () => setSeletcedButton('patient')}>
																Patient
															</Button>
														</Grid>
														<Grid item>
															<Button sx={{ color: (selectedButton=='doctor'?'white':'#2196F3'), borderRadius:5, backgroundColor: (selectedButton=='doctor'?'#2196F3':'#FFFFFF') }} variant={selectedButton=='doctor'?'contained':'outlined'} size='small' onClick={ () => setSeletcedButton('doctor')}>
																Doctor
															</Button>
														</Grid>
													</Grid>
												</Stack>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										{selectedButton && selectedButton == 'patient' && <PatientRegister />}
										{selectedButton && (selectedButton == 'doctor') && <DoctorPharmaRegister type={selectedButton}/>}
									</Grid>
									<Grid item xs={12}>
										<Divider />
									</Grid>
									<Grid item xs={12}>
										<Grid item container direction="column" alignItems="center" xs={12}>
											<Typography component={Link} to="/pages/login/login3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Already have an account?
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</AuthCardWrapper>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sx={{ m: 3, mt: 1 }}>
					<AuthFooter />
				</Grid>
			</Grid>
		</AuthWrapper1>
	);
};

export default Register;
