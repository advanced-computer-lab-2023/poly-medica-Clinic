import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import AccountProfile from './AccountProfile';
import DcotorAccountProfileDetails from './accountProfileDetails/DoctorAccountProfileDetails';
import PatientAccountProfileDetails from './accountProfileDetails/PatientAccountProfileDetails';
import { useUserContext } from 'hooks/useUserContext';
import { ADMIN_TYPE_ENUM, DOCTOR_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants';

const Page = () => {
    
    
    const { user } = useUserContext();
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
									{user.type == DOCTOR_TYPE_ENUM &&<DcotorAccountProfileDetails />}
									{user.type == PATIENT_TYPE_ENUM &&<PatientAccountProfileDetails />}
									{user.type == ADMIN_TYPE_ENUM &&<PatientAccountProfileDetails />}
									{/* here will be the gener */}
								</Grid>
							</Grid>
						</div>
					</Stack>
				</Container>
			</Box>
		</>
	);};


export default Page;
