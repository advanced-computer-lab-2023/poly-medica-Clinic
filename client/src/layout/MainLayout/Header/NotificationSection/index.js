import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
	Avatar,
	Badge,
	Box,
	ButtonBase,
	Chip,
	ClickAwayListener,
	Divider,
	Grid,
	Paper,
	Popper,
	Stack,
	Typography,
	useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons';
import { useUserContext } from 'hooks/useUserContext';
import Swal from 'sweetalert2';
import { communicationAxios } from 'utils/AxiosConfig';


// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
	const theme = useTheme();
	const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

	const [open, setOpen] = useState(false);
	const { user } = useUserContext(); 
	const [notifications, setNotifications] = useState([]);
	const [numberOfUnseenNotification, setNumberOfUnseenNotification] = useState(0);
	const [dataChange, setDataChange] = useState(false);

	const handledataChange = () => {
		setDataChange(!dataChange);
	};
	/**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
	const anchorRef = useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		} else if( prevOpen.current === false && open === true ){
			communicationAxios.get(`/notifications/${user.id}`).then( response => {
				setNotifications( () => [ ...response.data ]);
				let counter = 0;
				response.data.map( notification => {
					if(!notification.notificationState)
						counter++;
				});
				setNumberOfUnseenNotification(counter);
			}).catch( error => {
				console.log(error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.response.data.errMessage,
				});
			});
		}
		prevOpen.current = open;
	}, [open, dataChange]);

	return (
		<>
			<Box
				sx={{
					ml: 2,
					mr: 3,
					[theme.breakpoints.down('md')]: {
						mr: 2
					}
				}}
			>
				<ButtonBase sx={{ borderRadius: '12px' }}>
				<Badge badgeContent={numberOfUnseenNotification} color="error">
					<Avatar
						variant="rounded"
						sx={{
							...theme.typography.commonAvatar,
							...theme.typography.mediumAvatar,
							transition: 'all .2s ease-in-out',
							background: theme.palette.secondary.light,
							color: theme.palette.secondary.dark,
							'&[aria-controls="menu-list-grow"],&:hover': {
								background: theme.palette.secondary.dark,
								color: theme.palette.secondary.light
							}
						}}
						ref={anchorRef}
						aria-controls={open ? 'menu-list-grow' : undefined}
						aria-haspopup="true"
						onClick={handleToggle}
						color="inherit"
					>
						<IconBell stroke={1.5} size="1.3rem" />
					</Avatar>
					</Badge>
				</ButtonBase>
			</Box>
			<Popper
				placement={matchesXs ? 'bottom' : 'bottom-end'}
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				popperOptions={{
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [matchesXs ? 5 : 0, 20]
							}
						}
					]
				}}
			>
				{({ TransitionProps }) => (
					<Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
									<Grid container direction="column" spacing={2}>
										<Grid item xs={12}>
											<Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
												<Grid item>
													<Stack direction="row" spacing={4}>
														<Typography variant="subtitle1">All Notification</Typography>
														<Chip
															size="small"
															label={numberOfUnseenNotification}
															sx={{
																color: theme.palette.background.default,
																bgcolor: theme.palette.warning.dark,
															}}
														/>
													</Stack>
												</Grid>
												<Grid item>
													<Typography onClick={ () => {
														
														communicationAxios.patch(`/notifications/${user.id}`).then( () => {
															setNumberOfUnseenNotification(0);
															handledataChange();
														}).catch( error => {
															console.log(error);
															Swal.fire({
																icon: 'error',
																title: 'Oops...',
																text: error.response.data.errMessage,
															});
														});
													} } sx={{ marginLeft: 1 }} component={Link} to="#" variant="subtitle2" color="primary">
                            Mark as all read
													</Typography>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}>
												<NotificationList notifications={notifications} />
											</PerfectScrollbar>
										</Grid>
									</Grid>
									<Divider />
									
								</MainCard>
							</ClickAwayListener>
						</Paper>
					</Transitions>
				)}
			</Popper>
		</>
	);
};

export default NotificationSection;
