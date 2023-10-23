import { useState } from 'react';
import { 
    Typography, 
    Grid, 
    Card,
    CardContent,
    Button
} from '@mui/material';
import { format } from 'date-fns';
import BookAppointment from './BookAppointment.js';


// assuming that from and until have the same day
const getDay = (date) => {
    return format(new Date(date), 'd MMM, yyyy');
};
const getTime = (date) => {
    return format(new Date(date), 'p');
};


const DoctorDetailsAppointments = ({ selectedDoctor }) => {
    const { availableSlots } = selectedDoctor;
    const [ selectedAppointmentIdx, setSelectedAppointmentIdx ] = useState(null);
    const handleDialogClose = () => {
        setSelectedAppointmentIdx(null);
    };
    console.log('selectedAppointmentIdx', selectedAppointmentIdx);
    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.isArray(availableSlots) && availableSlots.map((slot, index) => (
                    <Grid item key={index} xs={4} sm={4}>
                        <Card 
                            sx = {{ 
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
                                    textAlign: 'center' 
                                }}
                            >
                                <Typography sx={{ mb: 1.5 }} variant="h5">
                                    {getDay(slot.from)}
                                </Typography>

                                <Typography component="h6" color="text.primary">
                                        {`From : ${getTime(slot.from)}`}
                                </Typography>
                                <Typography component="h6" color="text.primary" sx={{ mb: '1.5em' }}>
                                        {`To : ${getTime(slot.until)}`}
                                </Typography>
                                
                                <Button 
                                    size="small" 
                                    variant="outlined" 
                                    color="secondary"
                                    onClick={() => setSelectedAppointmentIdx({ index })}
                                >
                                    Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
            <BookAppointment
                selectedDoctor={selectedDoctor}
                selectedAppointmentIdx={selectedAppointmentIdx}
                handleDialogClose={handleDialogClose}
            />
        </>

	);
};

export default DoctorDetailsAppointments;