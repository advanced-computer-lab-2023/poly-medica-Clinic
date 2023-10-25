import React, { useState } from 'react';

import { 
    Typography, 
    Card,
    CardContent,
    Button,
    Accordion,
    AccordionDetails,
    Autocomplete,
    TextField
} from '@mui/material';

import { format } from 'date-fns';

const allMembers = [
    'Ahmad1',
    'Ahmad2',
    'Ahmad3'
];

// assuming that from and until have the same day
const getDay = (date) => {
    return format(new Date(date), 'd MMM, yyyy');
};
const getTime = (date) => {
    return format(new Date(date), 'p');
};

const DoctorDetailsAppointmentsCard = ({ selectedDoctor, availableSlotsIdx/*, patientId */ }) => {
    const { availableSlots } = selectedDoctor;
    const slot = availableSlots[availableSlotsIdx];
    
    const [expanded, setExpanded] = useState(false);
    const [selectedBookingType, setSelectedBookingType] = useState('myself');
    const [selectedMember, setSelectedMember] = useState(null); // for autocomplete
	
    const handleExpand = () => {
		setExpanded(oldExpanded => !oldExpanded);
	};
    const handleChange = (event, value) => {
        setSelectedMember(value);
    };
    const handleBookNow = () => {
        console.log('Book Now');
        // const appointment = {
        //     patientId,
        //     doctorId: selectedDoctor._id,
        //     patientName: '',
        //     doctorName: selectedDoctor.userData.name,
        // };
    };
    return(
        <>
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
                        variant="text" 
                        color="primary"
                        onClick={handleExpand}
                    >
                        {`${expanded? 'Hide': 'View'} Booking Options`} 
                    </Button>
                    <Accordion expanded={expanded}>
                        {/* must have this empty typography for the accordion 
                        to work properly (acts as summary) */}
                        <Typography />
                        <AccordionDetails>
                            <div 
                                style={{
                                    display: 'flex', 
                                    justifyContent: 'space-around', 
                                    flexDirection: 'row', 
                                    textAlign: 'center',
                                    marginBottom: '2em'
                                }}
                            >
                                <Button
                                    size="small"
                                    variant= {selectedBookingType=='myself'?'outlined':'text'}
                                    color= 'secondary'
                                    sx = {{ 
                                        color: (selectedBookingType=='myself'?'secondary': '#808080')
                                    }}
                                    onClick={() => setSelectedBookingType('myself')}
                                >
                                    Myself
                                </Button>
                                <Button
                                    size="small"
                                    variant= {selectedBookingType=='family'?'outlined':'text'}
                                    color= 'secondary'
                                    sx = {{ 
                                        color: (selectedBookingType=='family'?'secondary': '#808080')
                                    }}
                                    onClick={() => setSelectedBookingType('family')}
                                >
                                    Family Member
                                </Button>
                            </div>
                            
                            {
                                selectedBookingType=='family' && 
                                <div 
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginBottom: '2em'
                                    }}
                                >
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={allMembers}
                                        sx={{ 
                                            width: 160,
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Select member" />}
                                        onChange={handleChange}
                                    />
                                </div>
                            }
                            <Button
                                size="small"
                                variant="contained"
                                color= 'primary'
                                sx = {{
                                    borderRadius: 5
                                }}
                                disabled={selectedBookingType=='family' && !selectedMember}
                                onClick={handleBookNow}
                            >
                                Book Now
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
        </>
    );
};

export default DoctorDetailsAppointmentsCard;