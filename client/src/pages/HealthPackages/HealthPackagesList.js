import { Typography, Grid, Card, CardHeader, Box, CardActions, Button, CardContent } from '@mui/material';
import { Star } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { useUserContext } from 'hooks/useUserContext';
import Swal from 'sweetalert2';
import { patientAxios } from 'utils/AxiosConfig';
const HealthPackagesList = ({ packages, handleEditButtonClick, handleDeleteButtonClick, subscribedPackage, setSubscribedPackage }) => {
	const { user } = useUserContext();
	///patient/:id/health-packages/
	
	// const handleSubscribe = () => {
	// 	patientAxios
	// }

	const handleCancel = () => {
		Swal.fire({
			title: 'Confirm Cancellation',
			text: 'Are you sure you want to cancel this package?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, cancel it!'
		}).then((result) => {
			if (result.isConfirmed) {
				patientAxios.patch(`patient/${user.id}/health-packages/${subscribedPackage.packageId}`).then((response => {
					if (response.status === 200) Swal.fire({ title: 'Cancelled successfully', icon: 'success' });
				}));
			}
		});
	};

	return (
		<Grid container spacing={5} alignItems="flex-end">
			{Array.isArray(packages) && packages.map((pack) => (
				// Platinum card is full width at sm breakpoint
				<Grid
					item
					key={pack.name}
					xs={12}
					sm={pack.name === 'platinium' ? 12 : 6}
					md={4}
				>
					<Card>
						<CardHeader
							title={pack.name}
							titleTypographyProps={{ align: 'center' }}
							action={pack.name === 'gold' ? <Star /> : null}
							subheaderTypographyProps={{
								align: 'center',
							}}
							sx={{
								backgroundColor: (theme) =>
									theme.palette.mode === 'light'
										? theme.palette.grey[200]
										: theme.palette.grey[700],
							}}
						/>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'baseline',
									mb: 2,
								}}
							>
								<Typography component="h2" variant="h3" color="text.primary">
									{`$ ${pack.price}`}
								</Typography>
								<Typography variant="h6" color="text.secondary">
									/mo
								</Typography>
							</Box>
							<ul>
								<Typography component="h6" color="text.primary">
									{` Doctor's Discount : ${pack.discountOfDoctor}%`}
								</Typography>
								<Typography component="h6" color="text.primary">
									{`Medicines discount : ${pack.discountOfMedicin}%`}
								</Typography>
								<Typography component="h6" color="text.primary">
									{`Family Discount : ${pack.discountOfFamily}%`}
								</Typography>
							</ul>
						</CardContent>
						<Stack direction="row" spacing={2} justifyContent="center" >
							<Button variant="contained" color='secondary' endIcon={<EditIcon />} onClick={(event) => handleEditButtonClick(pack, event)} >
								Edit
							</Button>
							<Button variant="outlined" color='secondary' startIcon={<DeleteIcon />} onClick={() => handleDeleteButtonClick(pack)}>
								Delete
							</Button>
						</Stack>
						<CardActions>
							<Button fullWidth variant="contained" color='secondary' sx={{ background: (subscribedPackage && pack._id.toString() === subscribedPackage.packageId.toString()) ? 'red' : '' }}
								onClick={(subscribedPackage && pack._id.toString() === subscribedPackage.packageId.toString()) ? handleCancel : setSubscribedPackage}>
								{(subscribedPackage && pack.name === subscribedPackage.name) ? 'Cancel Subscribtion' : 'Buy Now'}
							</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>

	);

};

export default HealthPackagesList;