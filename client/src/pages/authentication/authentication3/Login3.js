import React from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import boardingImage from 'assets/images/boarding.jpg';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';
// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<AuthWrapper1>
			<Grid container sx={{ minHeight: '100vh', padding: '2%' }}>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={7}>
							<img src={boardingImage} alt="Boarding" style={{ width: '100%', height: '70%', objectFit: 'fill' }} />
						</Grid>
						<Grid item xs={5} >
							<AuthCardWrapper>
								<Grid item container spacing={2} alignItems="center" justifyContent="center">
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
														Hi, Welcome Back
													</Typography>
													<Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
														Enter your credentials to continue
													</Typography>
												</Stack>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<AuthLogin />
									</Grid>
									<Grid item xs={12}>
										<Divider />
									</Grid>
									<Grid item xs={12}>
										<Grid item container direction="column" alignItems="center" xs={12}>
											<Typography component={Link} to="/login/register/register3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
												Don&apos;t have an account?
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</AuthCardWrapper>
						</Grid>
					</Grid>
				</Grid>
				{/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
					<AuthFooter />
				</Grid> */}
			</Grid>
		</AuthWrapper1>
	);
};

export default Login;
