import { useState, useEffect } from 'react';
import { clinicAxios } from 'pages/utilities/AxiosConfig';
import { Typography } from '@mui/material';
import AvailableSlotsList from '../../../ui-component/AvailableSlotsList.js';
import Swal from 'sweetalert2';
import '../../../assets/css/swalStyle.css';
import { useNavigate } from 'react-router-dom';
import { showFailureAlert, showSuccessAlert } from 'utils/swal.js';

const FollowUp = ({ selectedAppointment }) => {
    console.log('selectedAppointment', selectedAppointment);
    const [doctorAvailableSlots, setDoctorAvailableSlots] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        clinicAxios
            .get(`/doctor/${selectedAppointment.doctorId}`)
            .then((res) => {
                setDoctorAvailableSlots(res.data.doctor.availableSlots);
                setIsLoading(false);
            })
            .catch((error) => {
				console.log(error);
			});
    }
    , []);
    const handleFollowUpRequest = async (availableSlotsIdx) => {
        const appointmentData = {
            patientId: selectedAppointment.patientId,
            doctorId: selectedAppointment.doctorId,
            patientName: selectedAppointment.patientName,
            doctorName: selectedAppointment.doctorName,
            date: doctorAvailableSlots[availableSlotsIdx].from,
            status: 'Incomplete',
            type: 'follow-up',
            availableSlotsIdx: availableSlotsIdx,
            patientFamilyMember: selectedAppointment.patientFamilyMember,
        };
        
        await clinicAxios
            .post('/appointments/follow-up-requests', appointmentData)
            .then(() => {
                showSuccessAlert('Success!', 'Your request has been sent successfully!',
                () => {
                    navigate('/patient/pages/follow-up-requests', { replace: true });
                });
            });

    };
    const handleConfirmation = (event) => {
        if(selectedAppointment.status.toUpperCase() != 'COMPLETE'){
            showFailureAlert('Oops...', 'You cannot request a follow-up for an incomplete appointment!');
            return;
        }
        const availableSlotsIdx = parseInt(event.target.id);
        Swal.fire({
			title: 'Confirm Request',
			text: 'Are you sure you want to request this follow-up appointment?',
			icon: 'question',
			confirmButtonText: 'Yes',
			showCancelButton: 'true',
			cancelButtonText: 'No',
		}).then(async (result) => {
			if (result['isConfirmed']) {
				await handleFollowUpRequest(availableSlotsIdx);
			}
		});
    };
    return (
        <>   
            {
                isLoading 
                &&
                <Typography>Loading...</Typography>
            }
            {
                !isLoading
                &&
                doctorAvailableSlots.length != 0
                &&
                <>
                    <AvailableSlotsList
                        availableSlots={doctorAvailableSlots}
                        textOnButton='Request Now'
                        handleClick={handleConfirmation}
                    />
                </>
            }
            {
                !isLoading
                &&
                !doctorAvailableSlots.length
                &&
                <Typography>There are currently no available slots</Typography>
            }
        </>
    );
};

export default FollowUp;