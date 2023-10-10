import {  Typography ,Grid, Card, CardHeader, Box, CardActions, Button, CardContent } from '@mui/material';
import { Star } from '@mui/icons-material';
const HealthPackagesList = ({  packages }) =>
{
	return (
        
            
		<Grid container spacing={5} alignItems="flex-end">
			{Array.isArray(packages) && packages.map((packages) => (
				// Platinum card is full width at sm breakpoint
				<Grid
					item
					key={packages.name}
					xs={12}
					sm={packages.name === 'gold' ? 12 : 6}
					md={4}
				>
					<Card>
						<CardHeader
							title={packages.name}
							titleTypographyProps={{ align: 'center' }}
							action={packages.title === 'Platinum' ? <Star /> : null}
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
									{`$ ${packages.price}`}
								</Typography>
								<Typography variant="h6" color="text.secondary">
                        /mo
								</Typography>
							</Box>
							<ul>
								<Typography component="h6" color="text.primary">
									{`Discount for the doctor's sessions : ${packages.discountOfDoctor}`}
								</Typography>
								<Typography component="h6" color="text.primary">
									{`Discount on the medicines : ${packages.discountOfMedicin}`}
								</Typography>
								<Typography component="h6" color="text.primary">
									{`Discount for your family members : ${packages.discountOfFamily}`}
								</Typography>
							</ul>
						</CardContent>
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