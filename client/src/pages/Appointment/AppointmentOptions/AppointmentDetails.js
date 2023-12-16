import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import StyleIcon from '@mui/icons-material/Style';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';
import '../../../assets/css/swalStyle.css';
import { clinicAxios, communicationAxios } from 'pages/utilities/AxiosConfig';
import { useChat } from 'contexts/ChatContext.js';
import { DOCTOR_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants.js';
import { chatExist } from 'utils/ChatUtils.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { getDay, getTime } from '../../../utils/DateFormatter.js';
import { patientCanRefund } from '../../../utils/AppointmentUtils.js';
import AppointmentStatus from '../AppointmentStatus';
import { usePayment } from 'contexts/PaymentContext';


const AppointmentDetails = ({
    selectedAppointment,
    setSelectedAppointment,
    handleAppoinmentUpdate
}) => {
    const theme = useTheme();
    console.log('theme = ', theme);
    const { chats, setChats } = useChat();
    const { user } = useUserContext();
    const [cannotCompleteOrCancel, setCannotCompleteOrCancel] = useState(false);
    const { setPaymentDone } = usePayment();

    const handleCancel = async (refund) => {
        let userIdToNotify, notificationHead, notificationBody;
        if (user.type === PATIENT_TYPE_ENUM) {
            userIdToNotify = selectedAppointment.doctorId;
            notificationHead = 'Appointment Cancelled';
            notificationBody = `Mr/Miss ${user.name} has cancelled the appointment
             ${refund? 'and will be refunded' : 'and will not be refunded'}}`;
        }
        else{
            userIdToNotify = selectedAppointment.patientId;
            notificationHead = 'Appointment Cancelled';
            notificationBody = `Dr. ${user.name} has cancelled the appointment
             and you will be refunded`;
        }
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
                    const updatedAppointment = response.data;
                    setSelectedAppointment(updatedAppointment);
                    handleAppoinmentUpdate(updatedAppointment);
                    communicationAxios.post(`/notification/${userIdToNotify}/type/appointment`, {
                        notificationHead,
                        notificationBody
                    });
                    setPaymentDone(1);
                });
            });
    };
    const handleComplete = async () => {
        // TODO: implement this function after merge with communication-service
        console.log('appointment completed');
        clinicAxios
            .patch(`/appointments/complete/${selectedAppointment._id}`)
            .then((response) => {
                Swal.fire(
                    'Appointment Completed!',
                    'Your Appointment has been completed successfully!',
                    'success',
                    )
                    
                .then(() => {
                    const app = response.data;
                    setSelectedAppointment(app);
                    handleAppoinmentUpdate(app);
                    if (
                        !chatExist(chats, app.patientId, app.doctorId) &&
                        !chatExist(chats, app.doctorId, app.patientId)
                    ) {
                        const res = communicationAxios.post('/chat', {
                            chat: {
                                chatName: 'Doctor-Patient',
                                users: [
                                    {
                                        id: app.patientId,
                                        userType: PATIENT_TYPE_ENUM,
                                    },
                                    {
                                        id: app.doctorId,
                                        userType: DOCTOR_TYPE_ENUM,
                                    },
                                ],
                            },
                        });
                        setChats([res.data, ...chats]);
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7em' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <CalendarTodayIcon style={{ marginRight: '0.4em' }}/>
                            <Typography variant='body1'>
                                {`${getDay(selectedAppointment.date)} at ${getTime(selectedAppointment.date)}`}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <HelpCenterIcon style={{ marginRight: '0.4em' }}/>
                            <AppointmentStatus appointmentStatus={selectedAppointment.status} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <StyleIcon style={{ marginRight: '0.4em' }}/>
                            <Typography variant='body1'>
                                {selectedAppointment.type}
                            </Typography>
                        </div>
                        {
                            selectedAppointment.type == 'appointment'
                            &&
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                <AttachMoneyIcon style={{ marginRight: '0.4em' }}/>
                                {
                                    user.type=='patient'
                                    &&
                                    <Typography variant='body1'>
                                        {`Paid $${selectedAppointment.pricePaidByPatient}`}
                                    </Typography>                            }
                                {
                                    user.type=='doctor'
                                    &&
                                    <Typography variant='body1'>
                                        {`Received $${selectedAppointment.pricePaidToDoctor}`}
                                    </Typography>
                                }
                            </div>
                        }

                    </div>
                    
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
                            color= 'inherit'
                            sx = {{
                                color: '#FFFFFF',
                                marginTop: '3em',
                                width: '15em',
                                backgroundColor: '#BE001C',
                                ':hover': {
                                    backgroundColor: '#BE001C',
                                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
                                },
                            }}
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
                                color='secondary'
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
