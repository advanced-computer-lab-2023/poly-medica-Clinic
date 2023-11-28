// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
	Avatar,
	Button,
	Chip,
	Grid,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Typography
} from '@mui/material';

// assets
import { IconCalendarTime } from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';
import { APPOINTMENT_NOTIFICATION_TYPE_ENUM } from 'utils/Constants';

const ListItemWrapper = styled('div')(({ theme }) => ({
	cursor: 'pointer',
	padding: 16,
	'&:hover': {
		background: theme.palette.primary.light
	},
	'& .MuiListItem-root': {
		padding: 0
	}
}));

const chipSX = {
	height: 24,
	padding: '0 6px'
};

const BasicNotification = ({ header, body, date, notificationType, chipLabel, chipType }) => {
    const theme = useTheme();

	const chipStyles = {
		error:{
			...chipSX,
			color: theme.palette.orange.dark,
			backgroundColor: theme.palette.orange.light,
			marginRight: '5px'
		},
		success: {
			...chipSX,
			color: theme.palette.success.dark,
			backgroundColor: theme.palette.success.light,
			height: 28
		},
		warning: {
			...chipSX,
			color: theme.palette.warning.dark,
			backgroundColor: theme.palette.warning.light
		}
	};
    return ( 
        <ListItemWrapper>
				
				<Grid container display={'flex'} flexDirection={'row'}>
							<Grid item xs={12}>
							<ListItemAvatar>
								<Avatar alt="John Doe" src={User1} />
							</ListItemAvatar>
							</Grid>
							<Grid container justifyContent="center" item xs={12} sx={{ marginTop: -3 }}>
								<Typography variant="caption" display="block" gutterBottom>
                                    { 'John Doe' }
								</Typography>
							</Grid>
				</Grid>
				{/* <ListItemText justifyContent="flex-end" primary="John Doe" /> */}
				<ListItem alignItems="center" sx={{ marginBottom: 1, marginTop: 1 }}>
					<ListItemText primary={header} sx={{ marginLeft: 1 }} />
					<ListItemSecondaryAction sx={{ marginTop: -1 }}>
						<Grid container justifyContent="flex-end">
							<Grid item xs={12}>
								<Typography variant="caption" display="block" gutterBottom>
                                    {date}
								</Typography>
							</Grid>
						</Grid>
					</ListItemSecondaryAction>
				</ListItem>
				<Grid container direction="column" className="list-container">
					<Grid item xs={12} sx={{ pb: 2, marginLeft: 3 }} justifyContent={ 'center' }>
						<Typography variant="subtitle2">{body}</Typography>
					</Grid>
					
						{/* Buttons */}
					{notificationType === APPOINTMENT_NOTIFICATION_TYPE_ENUM &&
					<Grid item xs={12}>
					<Grid item xs={12}>
						<Grid container>
							<Grid item>
								<Button variant="contained" disableElevation endIcon={<IconCalendarTime stroke={1.5} size="1.3rem" />}>
									Appointments
								</Button>
							</Grid>
						</Grid>
					</Grid>
					</Grid>
					}

					
					
					{/* labels */}	
					<Grid item container sx={{ marginLeft: 5 }}>
							<Grid item>
								<Chip label={chipLabel} sx={chipStyles[chipType]} />
							</Grid>
						</Grid>

					{/* images => pharmacy when midcine out of stack*/}
					{/* <Grid item xs={12}>
						<Grid container>
							<Grid item xs={12}>
								<Card
									sx={{
										backgroundColor: theme.palette.secondary.light
									}}
								>
									<CardContent>
										<Grid container direction="column">
											<Grid item xs={12}>
												<Stack direction="row" spacing={2}>
													<IconPhoto stroke={1.5} size="1.3rem" />
													<Typography variant="subtitle1">demo.jpg</Typography>
												</Stack>
											</Grid>
										</Grid>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid> */}
				</Grid>
			</ListItemWrapper>
     );
};
 
export default BasicNotification;