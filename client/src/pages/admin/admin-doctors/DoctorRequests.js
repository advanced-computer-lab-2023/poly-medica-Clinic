import React, { useState, useEffect } from 'react';
import DoctorRequestCard from './DoctorRequestCard';
import { clinicAxios } from '../../../utils/AxiosConfig.js';
import Message from 'ui-component/Message';
import AcceptConfirmationDialog from './AcceptConfirmationDialog.js';
import RejectConfirmationDialog from './RejectConfirmationDialog.js';
import { addDoctor, addDoctorChat } from 'api/DoctorAPI';
import Loader from 'ui-component/Loader';
import { TWO_SECONDS } from 'utils/Constants';
const DoctorRequests = () => {
    const [doctorRequests, setDoctorRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDoctorRequest, setSelectedDoctorRequest] = useState('');
    const [confirmRejectDialog, setConfirmRejectDialog] = useState(false);
    const [confirmAcceptDialog, setConfirmAcceptDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [doctorIsBeingAccepted, setDoctorIsBeingAccepted] = useState(false);
    const [doctorIsBeingRejected, setDoctorIsBeingRejected] = useState(false);

    const [doctorRequestAccepted, setDoctorRequestAccepted] = useState(false);
    const [doctorRequestRejected, setDoctorRequestRejected] = useState(false);

    useEffect(() => {
        clinicAxios
            .get('/doctor-requests')
            .then((response) => {
                const data = response.data;
                setDoctorRequests(data.doctorRequests);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    const handleReject = (doctorReq) => {
        setSelectedDoctorRequest(doctorReq);
        setConfirmRejectDialog(true);
    };

    const handleCancelReject = () => {
        setConfirmRejectDialog(false);
        setDoctorIsBeingRejected(false);
        setTimeout(() => {
            setSelectedDoctorRequest('');
        }, TWO_SECONDS);
    };

    const handleAccept = (doctorReq) => {
        setSelectedDoctorRequest(doctorReq);
        setConfirmAcceptDialog(true);
    };

    const handleCancelAccept = () => {
        setConfirmAcceptDialog(false);
        setDoctorIsBeingAccepted(false);
        setTimeout(() => {
            setSelectedDoctorRequest('');
        }, TWO_SECONDS);
    };

    const handleConfirmAccept = (doctorReq) => {
        setSelectedDoctorRequest(doctorReq);
        setDoctorIsBeingAccepted(true);
        clinicAxios
            .delete(`/doctor-requests/${doctorReq._id}?accept=${true}`)
            .then(() => {
                setDoctorRequests((prevDoctorRequests) =>
                    prevDoctorRequests.filter(
                        (doctorRequest) => doctorRequest._id !== doctorReq._id
                    )
                );
            })
            .catch((error) => {
                setDoctorIsBeingAccepted(false);
                setSelectedDoctorRequest('');
                setDoctorIsBeingRejected(false);
                setErrorMessage('Error accepting doctor request');
                console.error('Error accepting doctor request:', error);
            });

        // Add the doctor to the doctor table 
        addDoctor(doctorReq)
            .then((response) => {
                const doctor = response.newDoctor;
                addDoctorChat(doctor).catch((err) => console.log(err));
                setConfirmAcceptDialog(false);
                setDoctorRequests((prevDoctorRequests) =>
                    prevDoctorRequests.filter(
                        (doctorRequest) => doctorRequest._id !== doctorReq._id
                    )
                );
                setDoctorIsBeingAccepted(false);
                setDoctorRequestAccepted(true);
                setTimeout(() => {
                    setSelectedDoctorRequest('');
                    setDoctorRequestAccepted(false);
                }, TWO_SECONDS);
            })
            .catch((error) => {
                setDoctorIsBeingAccepted(false);
                setSelectedDoctorRequest('');
                setDoctorIsBeingRejected(false);
                setErrorMessage('Error accepting doctor request');
                console.error('Error accepting doctor request:', error);
            });
    };

    const handleConfirmReject = (doctorReq) => {
        setSelectedDoctorRequest(doctorReq);
        setDoctorIsBeingRejected(true);
        clinicAxios
            .delete(`/doctor-requests/${doctorReq._id}?accept=${false}`)
            .then(() => {
                setConfirmRejectDialog(false);
                setDoctorRequests((prevDoctorRequests) =>
                    prevDoctorRequests.filter(
                        (doctorRequest) => doctorRequest._id !== doctorReq._id
                    )
                );
                setDoctorIsBeingRejected(false);
                setDoctorRequestRejected(true);
                setTimeout(() => {
                    setSelectedDoctorRequest('');
                    setDoctorRequestRejected(false);
                }, TWO_SECONDS);
            })
            .catch((error) => {
                setDoctorIsBeingAccepted(false);
                setSelectedDoctorRequest('');
                setDoctorIsBeingRejected(false);
                setErrorMessage('Error rejecting doctor request');
                console.error('Error rejecting doctor request:', error);
            });
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {doctorRequests.map((doctorRequest) => (
                        <DoctorRequestCard
                            key={doctorRequest._id}
                            doctorReq={doctorRequest}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))}

                    <AcceptConfirmationDialog
                        open={confirmAcceptDialog}
                        onClose={handleCancelAccept}
                        onConfirm={handleConfirmAccept}
                        title='Accept Doctor Request'
                        content={`Are you sure you want to accept the request of ${selectedDoctorRequest?.userData?.userName}?`}
                        errorMessage={errorMessage}
                        someoneIsBeingAccepted={doctorIsBeingAccepted}
                        selectedDoctorRequest={selectedDoctorRequest}
                    />

                    <RejectConfirmationDialog
                        open={confirmRejectDialog}
                        onClose={handleCancelReject}
                        onConfirm={handleConfirmReject}
                        title='Reject Doctor Request'
                        content={`Are you sure you want to reject the request of ${selectedDoctorRequest?.userData?.userName}?`}
                        errorMessage={errorMessage}
                        someoneIsBeingRejected={doctorIsBeingRejected}
                        selectedDoctorRequest={selectedDoctorRequest}
                    />

                    {doctorRequestAccepted && (
                        <Message
                            message={'Doctor request accepted successfully!'}
                            severity='success'
                            time={2000}
                            vertical={'bottom'}
                            horizontal={'right'}
                        />
                    )}

                    {doctorRequestRejected && (
                        <Message
                            message={'Doctor request rejected successfully!'}
                            severity='success'
                            time={2000}
                            vertical={'bottom'}
                            horizontal={'right'}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default DoctorRequests;
