import React, { useEffect, useState } from 'react';

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
import { doctorAxios } from 'pages/utilities/AxiosConfig';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import './style.css';


// assuming that from and until have the same day
const getDay = (date) => {
    return format(new Date(date), 'd MMM, yyyy');
};
const getTime = (date) => {
    //Note: localizes the date 
    //   adds 2 hours to the time considering our location and assuming given is GMT 
    return format(new Date(date), 'p');
};

const DoctorDetailsAppointmentsCard = ({ 
    selectedDoctor,
    availableSlotsIdx,
    loggedInPatient 
}) => {
    const { availableSlots } = selectedDoctor;
    const slot = availableSlots[availableSlotsIdx];
    
    const [expanded, setExpanded] = useState(false);
    const [selectedBookingType, setSelectedBookingType] = useState('myself');
	const [allFamilyMembers, setAllFamilyMembers] = useState([]); // for autocomplete
    const [selectedMember, setSelectedMember] = useState(null); // for autocomplete

    useEffect(() => {
        const familyMembers = [];
        loggedInPatient.familyMembers.forEach((member) => {
            familyMembers.push(member.name);
        });
        setAllFamilyMembers(familyMembers);
    });

    const handleExpand = () => {
		setExpanded(oldExpanded => !oldExpanded);
	};
    const handleChange = (event) => {
        console.log('event', event);
        setSelectedMember({ 
            index: parseInt(event.target.dataset.optionIndex), 
        });
    };
    const handleBookNow = async () => {
        const appointment = {
            // patientId: (to be filled in later)
            doctorId: selectedDoctor._id,
            // patientName: (to be filled in later)
            doctorName: selectedDoctor.userData.name,
            date: slot.from,
            status: 'pending',
            type: 'appointment',
            availableSlotsIdx
        };
        if (selectedBookingType=='myself') {
            appointment.patientId = loggedInPatient._id;
            appointment.patientName = loggedInPatient.userName;
        } else {
            appointment.patientId = loggedInPatient.familyMembers[selectedMember.index].id;
            appointment.patientName = loggedInPatient.familyMembers[selectedMember.index].name;
        }
        await doctorAxios
                .post('/appointments', appointment)
                .then(() => {
                    Swal.fire(
                        'Appointment Booked!',
                        'Your appointment has been booked successfully!',
                        'success'
                    );
                    // window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });

        
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
                                        options={allFamilyMembers}
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