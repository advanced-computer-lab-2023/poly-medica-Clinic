import { Typography, Grid, Card, CardHeader, Box, CardActions, Button, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { ADMIN_TYPE_ENUM, PATIENT_TYPE_ENUM, PAYMENT_ITEM_TYPES } from 'utils/Constants';
import { ChoosePayment } from 'utils/PaymentOptions';
import { createPackageData, isSubscribedPackage } from 'utils/HealthPackageUtils';
import { usePatientContext } from 'hooks/usePatientContext';
import { useAdminContext } from 'hooks/useAdminContext';
import { deleteHealthPackage } from 'api/AdminAPI';
import { updateHealthPackageStatus } from 'api/PatientAPI';
import { useSelector } from 'react-redux';

const HealthPackagesList = () => {

	const { packages, isPaymentOpen, setIsPaymentOpen, subscribedPackage, setSubscribedPackage, discount, setPackages } = usePatientContext();
	const { user } = useSelector(state => state.user);
	const [totalPrice, setTotalPrice] = useState(0);
	const [data, setData] = useState(null);
	const { setIsEditDialogOpen, setSelectedEditPackages } = useAdminContext();
	const handleSubscribe = (pack) => {
		const packageData = createPackageData(pack);
		setData(packageData);
		setTotalPrice(pack.price);
		setIsPaymentOpen(true);
	};

	const handleEditButtonClick = (pack, event) => {
		event.stopPropagation();
		setSelectedEditPackages(pack);
		setIsEditDialogOpen(true);
	};

	const handleDeleteButtonClick = (pack) => {
		deleteHealthPackage(pack).then(() => {
			setPackages((prevPackage) => {
				const updatedPackages = prevPackage.filter((packages) => {
					if (pack._id !== packages._id) {
						return packages;
					}
				});
				return updatedPackages;
			});
		});
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
				updateHealthPackageStatus(user, subscribedPackage).then(() => {
					Swal.fire({ title: 'Cancelled successfully', icon: 'success' });
					setSubscribedPackage(null);
				}
				);
			}
		});
	};

	return (
		<Grid container spacing={5} alignItems="flex-end">
			{Array.isArray(packages) && packages.map((pack) => (
				<Grid
					item
					key={pack.name}
					xs={12}
					sm={6}
					md={4}
				>
					<Card>
						<CardHeader
							title={pack.name}
							titleTypographyProps={{ align: 'center' }}
							subheaderTypographyProps={{ align: 'center' }}
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
										variant="h5"
										color="text.secondary"
										sx={{ textDecoration: 'line-through', color: 'red' }}
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
										{`$${pack.price - (pack.price * (discount / 100))}`}
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
						{
							user.type === ADMIN_TYPE_ENUM
							&&
							<Stack direction="row" spacing={2} justifyContent="center" >
								<Button variant="contained" color='secondary' endIcon={<EditIcon />} onClick={(event) => handleEditButtonClick(pack, event)} >
									Edit
								</Button>
								<Button variant="outlined" color='secondary' startIcon={<DeleteIcon />} onClick={() => handleDeleteButtonClick(pack)}>
									Delete
								</Button>
							</Stack>
						}

						<CardActions>
							{
								user.type === PATIENT_TYPE_ENUM
								&&
								<Button fullWidth variant="contained" color='secondary' sx={{ background: isSubscribedPackage(pack, subscribedPackage) ? '#C71585' : '' }}
									onClick={() => {
										if (isSubscribedPackage(pack, subscribedPackage)) {
											handleCancel();
										} else {
											handleSubscribe(pack);
										}
									}}>
									{(isSubscribedPackage(pack, subscribedPackage)) ? 'Cancel Subscribtion' : 'Subscribe Now'}
								</Button>
							}
						</CardActions>
					</Card >
				</Grid >
			))}
			<ChoosePayment isAddDialogOpen={isPaymentOpen} setIsAddDialogOpen={setIsPaymentOpen} items={data} amountToPay={totalPrice} type={PAYMENT_ITEM_TYPES[0]} />
		</Grid >


	);

};

export default HealthPackagesList;