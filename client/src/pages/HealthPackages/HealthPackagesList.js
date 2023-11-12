import { Typography, Grid, Card, CardHeader, Box, CardActions, Button, CardContent } from '@mui/material';
import { Star } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { useUserContext } from 'hooks/useUserContext';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { patientAxios } from 'utils/AxiosConfig';
import { HEALTH_PACKAGE_STATUS, PAYMENT_ITEM_TYPES } from 'utils/Constants';
import { ChoosePayment } from 'utils/PaymentOptions';
const HealthPackagesList = ({ packages, handleEditButtonClick, handleDeleteButtonClick, subscribedPackage, setSubscribedPackage, discount }) => {

	const { user } = useUserContext();
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [data, setData] = useState(null);
	const handleSubscribe = (pack) => {
		const healthPackage = {};
		healthPackage.packageId = pack._id;
		healthPackage.subscribtionDate = new Date();
		healthPackage.renewalDate = new Date(healthPackage.subscribtionDate);
		healthPackage.renewalDate.setMonth(healthPackage.renewalDate.getMonth() + 1);
		healthPackage.status = HEALTH_PACKAGE_STATUS[1];
		const packageData = {};
		packageData.healthPackage = healthPackage;
		setData(packageData);
		setTotalPrice(pack.price);
		setDialogOpen(true);
	};

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
					if (response.status === 200) {
						Swal.fire({ title: 'Cancelled successfully', icon: 'success' });
						setSubscribedPackage(null);
					}
				}));
			}
		});
	};

	const isSubscribedPackage = (pack) => {
		console.log('Subscribed Package = ', subscribedPackage);
		console.log('pack = ', pack);
		return subscribedPackage && pack.name === subscribedPackage.name && subscribedPackage.status === HEALTH_PACKAGE_STATUS[1];
	};

	return (
		<Grid container spacing={5} alignItems="flex-end">
			{Array.isArray(packages) && packages.map((pack) => (
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
								{discount > 0 ? (
									<Typography
										component="h2"
										variant="h4"
										color="text.secondary"
										sx={{ textDecoration: 'line-through' }}
									>
										{`$ ${pack.price}`}
									</Typography>
								) : (
									<Typography component="h2" variant="h3" color="text.primary">
										{`$ ${pack.price}`}
									</Typography>
								)}
								{discount > 0 && (
									<Typography sx={{ marginLeft: '2%' }} component="h2" variant="h4" color="text.primary">
										{`$ ${pack.price - (pack.price * (discount / 100))}`}
									</Typography>
								)}
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
							<Button fullWidth variant="contained" color='secondary' sx={{ background: isSubscribedPackage(pack) ? '#C71585' : '' }}
								onClick={() => {
									if (isSubscribedPackage(pack)) {
										handleCancel();
									} else {
										handleSubscribe(pack);
									}
								}}>
								{(isSubscribedPackage(pack)) ? 'Cancel Subscribtion' : 'Subscribe Now'}
							</Button>
						</CardActions>
					</Card >
				</Grid >
			))}
			<ChoosePayment isAddDialogOpen={isDialogOpen} setIsAddDialogOpen={setDialogOpen} items={data} amountToPay={totalPrice} type={PAYMENT_ITEM_TYPES[0]} />
		</Grid >


	);

};

export default HealthPackagesList;