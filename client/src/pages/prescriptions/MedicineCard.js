import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, IconButton } from '@mui/material';
import { PHARMACY_BASE_URL } from '../../utils/Constants';
import { Add } from '@mui/icons-material';
import { IconMinus } from '@tabler/icons';
export default function MedicineCard({ medicine }) {
    return (
        <Card sx={{ maxWidth: 250, margin: '2%', padding: '2%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${PHARMACY_BASE_URL}/medicines/${medicine._id}/pictures`}
                    alt="green iguana"
                    sx={{ objectFit: 'contain', cursor: 'default' }}
                />
                <CardContent sx={{ cursor: 'default', textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {medicine.name}
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4}>
                            <IconButton>
                                <IconMinus />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography color="text.secondary">
                                {medicine.amount}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <IconButton>
                                <Add />
                            </IconButton>
                        </Grid>
                    </Grid>



                </CardContent>
            </CardActionArea>
        </Card>
    );
}
