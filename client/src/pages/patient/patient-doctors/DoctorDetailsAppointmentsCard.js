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
import { styled } from '@mui/system';
import { getDay, getTime } from '../../../utils/DateFormatter.js';
import { commonStyles } from 'ui-component/CommonStyles.js';
import { calcPrice } from '../../../utils/PriceCalculator.js';
import { ChoosePayment } from 'utils/PaymentOptions.js';
import { PAYMENT_ITEM_TYPES, FAMILY_BOOKING_TYPE, MY_SELF_BOOKING_TYPE } from 'utils/Constants.js';

const useStyles = styled(() => commonStyles);

const DoctorDetailsAppointmentsCard = ({
    selectedDoctor,
    availableSlotsIdx,
    loggedInPatient,
    loggedInPatientHealthPackage
}
) => {
    const classes = useStyles();
    const { availableSlots } = selectedDoctor;
    const slot = availableSlots[availableSlotsIdx];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [selectedBookingType, setSelectedBookingType] = useState(MY_SELF_BOOKING_TYPE);
    const [allFamilyMembers, setAllFamilyMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [appointmentPrice, setAppointmentPrice] = useState(0);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {

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
        const price = calcPrice(selectedDoctor.hourlyRate, loggedInPatientHealthPackage.doctorDiscount);
        const appointment = {
            patientId: loggedInPatient._id,
            doctorId: selectedDoctor._id,
            patientName: loggedInPatient.userName,
            doctorName: selectedDoctor.userData.name,
            date: slot.from,
            status: 'Incomplete',
            type: 'appointment',
            availableSlotsIdx,
            pricePaidByPatient: price,
            pricePaidToDoctor: selectedDoctor.hourlyRate
        };
        if (selectedBookingType == FAMILY_BOOKING_TYPE) {
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
                <CardContent className={classes.appointmentCard} >
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
                        <Typography />
                        <AccordionDetails>
                            <div className={classes.accordion}>
                                <Button
                                    size="small"
                                    variant={selectedBookingType == MY_SELF_BOOKING_TYPE ? 'outlined' : 'text'}
                                    color='secondary'
                                    sx={{
                                        color: (selectedBookingType == MY_SELF_BOOKING_TYPE ? 'secondary' : '#808080')
                                    }}
                                    onClick={() => setSelectedBookingType(MY_SELF_BOOKING_TYPE)}
                                >
                                    Myself
                                </Button>
                                <Button
                                    size="small"
                                    variant={selectedBookingType == FAMILY_BOOKING_TYPE ? 'outlined' : 'text'}
                                    color='secondary'
                                    sx={{
                                        color: (selectedBookingType == FAMILY_BOOKING_TYPE ? 'secondary' : '#808080')
                                    }}
                                    onClick={() => setSelectedBookingType(FAMILY_BOOKING_TYPE)}
                                >
                                    Family Member
                                </Button>
                            </div>

                            {
                                selectedBookingType == FAMILY_BOOKING_TYPE &&
                                <div className={classes.autoCompleteContainer} >
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={allFamilyMembers}
                                        className={classes.autoComplete}
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
                                disabled={selectedBookingType == FAMILY_BOOKING_TYPE && !selectedMember}
                                onClick={handleBookNow}
                            >
                                Book Now
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
            <ChoosePayment isAddDialogOpen={isDialogOpen} setIsAddDialogOpen={setDialogOpen} amountToPay={appointmentPrice} type={PAYMENT_ITEM_TYPES[1]} items={selectedAppointment} selectedDoctor={selectedDoctor} />
        </>
    );
};

export default DoctorDetailsAppointmentsCard;