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

import { getDay, getTime } from '../../utils/DateFormatter.js';

import { calcPrice } from '../../utils/PriceCalculator.js';
import { ChoosePayment } from 'utils/PaymentOptions.js';
import { PAYMENT_ITEM_TYPES } from 'utils/Constants.js';
const DoctorDetailsAppointmentsCard = ({
    selectedDoctor,
    availableSlotsIdx,
    loggedInPatient,
    loggedInPatientHealthPackage
}
) => {
    const { availableSlots } = selectedDoctor;
    const slot = availableSlots[availableSlotsIdx];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [selectedBookingType, setSelectedBookingType] = useState('myself');
    const [allFamilyMembers, setAllFamilyMembers] = useState([]); // for autocomplete
    const [selectedMember, setSelectedMember] = useState(null); // for autocomplete
    const [appointmentPrice, setAppointmentPrice] = useState(0);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        // loggedInPatient.family members are already 
        // filtered [only unregistered/minors] from Doctor.js
        const familyMembers = [];
        loggedInPatient.familyMembers.forEach((member) => {
            familyMembers.push(member.name);
        });
        setAllFamilyMembers(familyMembers);
    }, []);


    const handleExpand = () => {
        setExpanded(oldExpanded => !oldExpanded);
    };
    const handleChange = (event) => {
        const index = parseInt(event.target.dataset.optionIndex);
        if (isNaN(index))
            setSelectedMember(null);
        else
            setSelectedMember({ index });
    };
    const handleBookNow = async () => {
        const appointment = {
            patientId: loggedInPatient._id,
            doctorId: selectedDoctor._id,
            patientName: loggedInPatient.userName,
            doctorName: selectedDoctor.userData.name,
            date: slot.from,
            status: 'Incomplete',
            type: 'appointment',
            availableSlotsIdx
        };
        if (selectedBookingType == 'family') {
            const familyMember = loggedInPatient.familyMembers[selectedMember.index];
            const patientFamilyMember = {
                name: familyMember.name,
                nationalId: familyMember.nationalId,
                age: familyMember.age,
                gender: familyMember.gender,
                relation: familyMember.relation
            };
            appointment.patientFamilyMember = patientFamilyMember;
        }
        const price = calcPrice(selectedDoctor.hourlyRate, loggedInPatientHealthPackage.doctorDiscount);
        setSelectedAppointment(appointment);
        setAppointmentPrice(price);
        setDialogOpen(true);
    };
    return (
        <>
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
                        {`${expanded ? 'Hide' : 'View'} Booking Options`}
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
                                    variant={selectedBookingType == 'myself' ? 'outlined' : 'text'}
                                    color='secondary'
                                    sx={{
                                        color: (selectedBookingType == 'myself' ? 'secondary' : '#808080')
                                    }}
                                    onClick={() => setSelectedBookingType('myself')}
                                >
                                    Myself
                                </Button>
                                <Button
                                    size="small"
                                    variant={selectedBookingType == 'family' ? 'outlined' : 'text'}
                                    color='secondary'
                                    sx={{
                                        color: (selectedBookingType == 'family' ? 'secondary' : '#808080')
                                    }}
                                    onClick={() => setSelectedBookingType('family')}
                                >
                                    Family Member
                                </Button>
                            </div>

                            {
                                selectedBookingType == 'family' &&
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
                                            '&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot': {
                                                padding: '0.3em',
                                                fontSize: '1em',
                                                fontWeight: 500,
                                            },
                                            width: 160
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Select member" />}
                                        onChange={handleChange}
                                    />
                                </div>
                            }
                            <Button
                                size="small"
                                variant="contained"
                                color='primary'
                                sx={{
                                    borderRadius: 5
                                }}
                                disabled={selectedBookingType == 'family' && !selectedMember}
                                onClick={handleBookNow}
                            >
                                Book Now
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
            <ChoosePayment isAddDialogOpen={isDialogOpen} setIsAddDialogOpen={setDialogOpen} amountToPay={appointmentPrice} type={PAYMENT_ITEM_TYPES[1]} items={selectedAppointment} />
        </>
    );
};

export default DoctorDetailsAppointmentsCard;