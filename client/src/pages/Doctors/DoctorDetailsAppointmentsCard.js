import React, { useState } from 'react';
// import { useTheme } from '@mui/material/styles';

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
    'Ahmad3',
    'Ahmad4',
    'Ahmad5',
    'Ahmad6',
    'Ahmad7',
    'Ahmad8',
    'Ahmad9',
    'Ahmad10',
    'Ahmad11',
    'Ahmad12',
    'Ahmad13',
    'Ahmad14',
    'Ahmad15',
    'Ahmad16',
    'Ahmad17',
    'Ahmad18',
    'Ahmad19',
    'Ahmad20',
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
    // const theme = useTheme();
    const [expanded, setExpanded] = useState(false);
	const handleExpand = () => {
		setExpanded(oldExpanded => !oldExpanded);
	};
    
    const [selectedValue, setSelectedValue] = useState('myself');
    console.log('selectedValue: ', selectedValue);

    const [selectedMember, setSelectedMember] = useState(null); // for autocomplete
    const handleChange = (event, value) => {
        console.log('value: ', value);
        setSelectedMember(value);
    };
    console.log('selectedMember: ', selectedMember);
    // console.log('selectedDoctor: ', selectedDoctor._id);
    // const handleBookNow = () => {
    //     const appointment = {
    //         patientId,
    //         doctorId: selectedDoctor._id,
    //         patientName: '',
    //         doctorName: selectedDoctor.userData.name,
    //     };
    // };
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
                                    variant= {selectedValue=='myself'?'outlined':'text'}
                                    color= 'secondary'
                                    sx = {{ 
                                        color: (selectedValue=='myself'?'secondary': '#808080')
                                    }}
                                    onClick={() => setSelectedValue('myself')}
                                >
                                    Myself
                                </Button>
                                <Button
                                    size="small"
                                    variant= {selectedValue=='family'?'outlined':'text'}
                                    color= 'secondary'
                                    sx = {{ 
                                        color: (selectedValue=='family'?'secondary': '#808080')
                                    }}
                                    onClick={() => setSelectedValue('family')}
                                >
                                    Family Member
                                </Button>
                            </div>
                            
                            {
                                selectedValue=='family' && 
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
                                disabled={selectedValue=='family' && !selectedMember}
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