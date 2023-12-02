import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button
} from '@mui/material';
import Swal from 'sweetalert2';
import '../../../assets/css/swalStyle.css';
import { getDay, getTime } from '../../../utils/DateFormatter.js';
import { patientCanRefund } from '../../../utils/AppointmentUtils.js';
import { clinicAxios } from 'pages/utilities/AxiosConfig';

const AppointmentDetails = ({ selectedAppointment, setSelectedAppointment, user }) => {
    const [cannotCompleteOrCancel, setCannotCompleteOrCancel] = useState(false);
    const handleCancel = async (refund) => {
        console.log('appointment cancelled, ', refund);
        const requestData = {
            doctorId: selectedAppointment.doctorId,
            appointmentDate: selectedAppointment.date,
            refund,
        };
        if(refund){
            requestData.patientId = selectedAppointment.patientId;
            requestData.pricePaidByPatient = selectedAppointment.pricePaidByPatient;
            requestData.pricePaidToDoctor = selectedAppointment.pricePaidToDoctor;
        }
        clinicAxios
            .patch(`/appointments/cancel/${selectedAppointment._id}`, requestData)
            .then((response) => {
                Swal.fire(
                    'Appointment Cancelled!',
                    'Your Appointment has been cancelled successfully!',
                    'success',
                )
                .then(() => {
                    console.log('response.data = ', response.data);
                    const updatedAppointment = response.data;
                    setSelectedAppointment(updatedAppointment);
                });
            });
    };
    const handleComplete = async () => {
        // TODO: implement this function after merge with communication-service
        console.log('appointment completed');
    };
    const handleCancelConfirmation = () => {
        const refund = (user.type == 'doctor') || patientCanRefund(selectedAppointment.date);
        let swalText = '';
        if(user.type == 'patient'){
            swalText += (refund? 
                'The appointment reservation is refundable. ' :
                'The appointment reservation is non-refundable. There are only 24 hours left for the appointment. '); 
        }
        else{ // user.type = 'doctor'
            swalText += 'The patient will be refunded the appointment reservation. ';
        }
        Swal.fire({
			title: 'Do you Confirm Cancellation ?',
			text: swalText,
			icon: 'question',
			confirmButtonText: 'Yes',
			showCancelButton: 'true',
			cancelButtonText: 'No',
		}).then(async (result) => {
			if (result['isConfirmed']) {
				await handleCancel(refund);
			}
		});

    };
    const handleCompleteConfirmation = () => {
        Swal.fire({
			title: 'Confirm Completion',
			text: 'Are you sure you want to complete this appointment?',
			icon: 'question',
			confirmButtonText: 'Yes',
			showCancelButton: 'true',
			cancelButtonText: 'No',
		}).then(async (result) => {
			if (result['isConfirmed']) {
				await handleComplete();
			}
		});
    };
    useEffect(() => {
        console.log('selectedAppointment == ', selectedAppointment);
        if(selectedAppointment){
            setCannotCompleteOrCancel(
                selectedAppointment.status.toUpperCase() == 'COMPLETE'
                || selectedAppointment.status.toUpperCase() == 'CANCELLED'
            );
        }
    }, [selectedAppointment]);
    let patientFamilyMember, familyMemberText;
    if(selectedAppointment){
        patientFamilyMember = selectedAppointment.patientFamilyMember;
        familyMemberText = (user.type=='patient')? 
            'your family member Mr/Miss ' :
            `Mr/Miss ${selectedAppointment.patientName}'s family member: Mr/Miss `;
    }
    return (
        <>
            {selectedAppointment && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5em' }}>
                        {
                            user.type=='patient' 
                            &&
                            <>
                                <Typography variant='h4' >
                                    {`Dr. ${selectedAppointment.doctorName}`}
                                </Typography>
                            </>
                        }
                        {
                            user.type=='doctor' 
                            &&
                            <>
                                <Typography variant='h4'>
                                    {`Mr/Miss ${selectedAppointment.patientName}`}
                                </Typography>
                            </>
                        }
                    </div>
                    <Typography variant='subtitle1'>Date:</Typography>
                    <Typography variant='body1'>
                        {`${getDay(selectedAppointment.date)} at ${getTime(selectedAppointment.date)}`}
                    </Typography>
                    <Typography variant='subtitle1'>Status:</Typography>
                    <Typography variant='body1'>
                        {selectedAppointment.status}
                    </Typography>
                    <Typography variant='subtitle1'>Type:</Typography>
                    <Typography variant='body1'>
                        {selectedAppointment.type}
                    </Typography>
                    <section name='price'> {/* only for semantic purpose*/}
                        {
                            user.type=='patient'
                            &&
                            <>
                                <Typography variant='subtitle1'>Price Paid:</Typography>
                                <Typography variant='body1'>
                                    {`$ ${selectedAppointment.pricePaidByPatient}`}
                                </Typography>
                            </>
                        }
                        {
                            user.type=='doctor'
                            &&
                            <>
                                <Typography variant='subtitle1'>Price Received:</Typography>
                                <Typography variant='body1'>
                                    {`$ ${selectedAppointment.pricePaidToDoctor}`}
                                </Typography>
                            </>
                        }
                    </section>
                    {  
                        patientFamilyMember
                        &&
                        <>
                            <Typography variant='subtitle1'>Notes:</Typography>
                            <Typography variant='body1'>
                                {`This appointment is for ${familyMemberText} ${patientFamilyMember.name}`}
                            </Typography>
                        </>
                    }
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button
                            variant='contained'
                            color='error'
                            sx = {{ marginTop: '3em', width: '15em' }}
                            onClick={handleCancelConfirmation}
                            disabled={cannotCompleteOrCancel}
                        >
                            Cancel Appointment
                        </Button>
                        {
                            user.type=='doctor'
                            &&
                            <Button
                                variant='contained'
                                color='success'
                                sx = {{ marginTop: '3em', width: '15em' }}
                                onClick={handleCompleteConfirmation}
                                disabled={cannotCompleteOrCancel}
                            >
                                Complete Appointment
                            </Button>
                        }
                    </div>
                </>
            )}
        </>
    );
};

export default AppointmentDetails;
