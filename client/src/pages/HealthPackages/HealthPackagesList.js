import { Typography, Grid, Card, CardHeader, Box, CardActions, Button, CardContent } from '@mui/material';
import { Star } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
const HealthPackagesList = ({ packages, handleEditButtonClick, handleDeleteButtonClick }) => {
	return (


		<Grid container spacing={5} alignItems="flex-end">
			{Array.isArray(packages) && packages.map((pack) => (
				// Platinum card is full width at sm breakpoint
				<Grid
					item
					key={pack.name}
					xs={12}
					sm={pack.name === 'platnium' ? 12 : 6}
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
							<Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteButtonClick(pack)}>
								Delete
							</Button>
							<Button variant="contained" endIcon={<EditIcon />} onClick={(event) => handleEditButtonClick(pack, event)} >
								Edit
							</Button>
						</Stack>
						<CardActions>
							<Button fullWidth variant="contained">
								Buy Now
						</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>

	);

};

export default HealthPackagesList;