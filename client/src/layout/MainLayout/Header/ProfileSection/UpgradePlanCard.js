// material-ui
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { patientAxios } from 'utils/AxiosConfig';
import { HEALTH_PACKAGE_STATUS } from 'utils/Constants';
import { useNavigate } from 'react-router-dom';
// styles
const CardStyle = styled(Card)(({ theme }) => ({
	background: theme.palette.warning.light,
	marginTop: '16px',
	marginBottom: '16px',
	overflow: 'hidden',
	position: 'relative',
	'&:after': {
		content: '""',
		position: 'absolute',
		width: '200px',
		height: '200px',
		border: '19px solid ',
		borderColor: theme.palette.warning.main,
		borderRadius: '50%',
		top: '65px',
		right: '-150px'
	},
	'&:before': {
		content: '""',
		position: 'absolute',
		width: '200px',
		height: '200px',
		border: '3px solid ',
		borderColor: theme.palette.warning.main,
		borderRadius: '50%',
		top: '145px',
		right: '-70px'
	}
}));

// ==============================|| PROFILE MENU - UPGRADE PLAN CARD ||============================== //

const UpgradePlanCard = () => {
	const [healthPackages, setHealthPackages] = useState([]);
	const { user } = useUserContext();
	const renewalDate = healthPackages[0] ? new Date(healthPackages[0].renewalDate) : new Date();
	const options = { day: 'numeric', month: 'long' };
	const formattedRenewalDate = renewalDate.toLocaleString('en-US', options);
	const navigate = useNavigate();
	useEffect(() => {
		patientAxios.get(`/patient/${user.id}/health-packages`).then((response) => {
			setHealthPackages(response.data.healthPackages);
		}).catch((err) => {
			console.log(err);
		});
	}, []);
	return (
		<CardStyle>
			<CardContent>
				<Grid container direction="column" spacing={2}>
					<Grid item>
						<Typography variant="h4">{healthPackages[0] && healthPackages[0].name}</Typography>
					</Grid>
					<Grid item>
						{healthPackages[0] ? (<Typography variant="subtitle2" color="black" sx={{ opacity: 0.6 }}>
							{healthPackages[0].doctorDiscount}% discount on appointments <br />
							{healthPackages[0].medicineDiscoubnt}% discount on medicines <br />
							{healthPackages[0].familyDiscount}% discount for family members <br />
						</Typography>) : (<Typography>You are not subscribed to a package yet</Typography>)}
					</Grid>
					<Grid item>
						<Stack direction="row">
							<AnimateButton>
								<Button variant="contained" color="warning" sx={{ boxShadow: 'none' }} onClick={() => { navigate('/patient/pages/packages'); }}>
									{healthPackages[0] ? 'Upgrade Plan' : 'Subscribe now'}
								</Button>
							</AnimateButton>
						</Stack>
						{healthPackages[0] &&
							<Typography variant='subtitle2' color='darkgreen' sx={{ marginTop: '2%' }}>
								{healthPackages[0].status === HEALTH_PACKAGE_STATUS[1]
									? (
										<span>
											Your subscribtion renews on:<br />
											{formattedRenewalDate}
										</span>
									)
									: (
										<span>
											Your subscribtion is cancelled, ends on:<br />
											{formattedRenewalDate}
										</span>
									)
								}
							</Typography>
						}
					</Grid>
				</Grid>
			</CardContent>
		</CardStyle>
	);
};

export default UpgradePlanCard;
