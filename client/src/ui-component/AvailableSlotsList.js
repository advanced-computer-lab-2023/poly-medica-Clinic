import {
	Button,
	Typography,
	Grid,
	Card,
	CardContent,
} from '@mui/material';
import { getDay, getTime } from '../utils/DateFormatter.js';

const AvailableSlotsList = ({ availableSlots, textOnButton, handleClick }) => {

    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
        >
            {Array.isArray(availableSlots) &&
                availableSlots.length > 0 &&
                availableSlots.map((slot, index) => (
                    <Grid item key={index} xs={4} sm={6}>
                        <Card
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.grey[200]
                                        : theme.palette.grey[700],
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography sx={{ mb: 1.5 }} variant='h5'>
                                    {getDay(slot.from)}
                                </Typography>

                                <Typography component='h6' color='text.primary'>
                                    {`From : ${getTime(slot.from)}`}
                                </Typography>
                                <Typography
                                    component='h6'
                                    color='text.primary'
                                    sx={{ mb: '1.5em' }}
                                >
                                    {`To : ${getTime(slot.until)}`}
                                </Typography>

                                <Button
                                    id={index}
                                    size='small'
                                    variant='text'
                                    color='primary'
                                    onClick={handleClick}
                                >
                                    { textOnButton }
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default AvailableSlotsList;