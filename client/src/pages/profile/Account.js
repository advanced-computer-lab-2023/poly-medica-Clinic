import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { AccountProfileDetails } from './AccountProfileDetails';
import MedicalHistory from './MedicalHistory';
import { AccountProfile } from './AccountProfile';
const Page = () => {



	return (
		<>
			<main>
				<title>
					Account | Devias Kit
				</title>
			</main>
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
									<AccountProfileDetails />
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
