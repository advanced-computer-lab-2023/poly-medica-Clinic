import React from 'react';
import DoctorIcon from '../../../assets/images/icons/DoctorIcon.png';
import EmailIcon from '@mui/icons-material/Email';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
	useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { useAdminContext } from 'hooks/useAdminContext';
import { commonStyles } from 'ui-component/CommonStyles';

const useStyles = styled(() => commonStyles);

const AdminDetails = () => {
	const classes = useStyles();
	const theme = useTheme();
	const title = ' ';

	const { setSelectedAdmin, setErrorMessage, selectedAdmin } = useAdminContext();

	const handleDialogClose = () => {
		setSelectedAdmin(null);
		setErrorMessage('');
	};

	return (
		<Dialog
			open={selectedAdmin}
			onClose={handleDialogClose}
			PaperProps={{ sx: { minWidth: theme.breakpoints.values.md > 800 ? 500 : 300 } }}
		>
			{selectedAdmin && (
				<>
					<DialogTitle align='center' variant='h2'>
						{selectedAdmin.userName}
					</DialogTitle>
					<DialogContent>
						<div className={classes.container}>
							<div>
								<img
									src={DoctorIcon}
									alt={`${title} ${selectedAdmin.userName}`}
									width='100'
									height='100'
								/>
								<Typography variant='h4' sx={{ marginTop: '1em' }}>
									{`${title} ${selectedAdmin.userName}`}
								</Typography>
							</div>
							<div className={classes.infoContainer}>
								<div className={classes.emailContainer}>
									<EmailIcon className={classes.iconMargin} />
									<Typography variant='body1'>{selectedAdmin.email}</Typography>
								</div>
								<div className={classes.emailContainer}>
									<StarBorderIcon className={classes.iconMargin} />
									<Typography variant='body1'>
										{selectedAdmin.mainAdmin ? 'Main Admin' : 'Sub Admin'}
									</Typography>
								</div>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose} color='primary'>
							Close
						</Button>
					</DialogActions>
				</>
			)}
		</Dialog>
	);
};

export default AdminDetails;
