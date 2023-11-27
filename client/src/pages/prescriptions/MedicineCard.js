import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import { PHARMACY_BASE_URL } from '../../utils/Constants';
import { Add } from '@mui/icons-material';
export default function MedicineCard({ medicine }) {
	return (
		<Card sx={{ maxWidth: 250, margin: '2%', padding: '2%' }}>
			<CardActionArea>
				<CardMedia
					component='img'
					height='140'
					image={`${PHARMACY_BASE_URL}/medicines/${medicine._id}/pictures`}
					alt='green iguana'
					sx={{ objectFit: 'contain', cursor: 'default' }}
				/>
				<CardContent sx={{ cursor: 'default' }}>
					<Typography gutterBottom variant='h5' component='div'>
						{medicine.name}
					</Typography>
					<Typography
						sx={{ display: 'inline' }}
						variant='body2'
						color='text.secondary'
					>
						{medicine.amount}
					</Typography>
					<IconButton>
						<Add />
					</IconButton>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
