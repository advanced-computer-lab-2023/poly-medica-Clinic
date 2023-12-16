import DoctorIcon from '../../assets/images/icons/DoctorIcon.png';
import EmailIcon from '@mui/icons-material/Email';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
} from '@mui/material';

const AdminDetails = ({ selectedAdmin, handleDialogClose }) => {
	const title = ' ';
	return (
		<Dialog
			open={selectedAdmin}
			onClose={handleDialogClose}
			PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}
		>
			{selectedAdmin && (
				<>
					<DialogTitle align='center' variant='h2'>
						{selectedAdmin.userName}
					</DialogTitle>
					<DialogContent>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
								flexDirection: 'row',
								marginBottom: '5em',
							}}
						>
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
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.7em',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'row',
									}}
								>
									<EmailIcon style={{ marginRight: '0.4em' }} />
									<Typography variant='body1'>
										{`${selectedAdmin.email}`}
									</Typography>
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'row',
									}}
								>
									<StarBorderIcon style={{ marginRight: '0.4em' }} />
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
