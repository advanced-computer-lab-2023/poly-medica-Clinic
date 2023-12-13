import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Tooltip from '@mui/material/Tooltip';

const AppointmentStatus = ({ appointmentStatus }) => {
    console.log(appointmentStatus);
    const completeColor = (appointmentStatus == 'Complete') ? 'success' : 'disabled';
    const cancelledColor = (appointmentStatus == 'Cancelled') ? 'error' : 'disabled';
    const incompleteColor = (appointmentStatus == 'Incomplete') ? 'primary' : 'disabled';
    const rescheduledColor = (appointmentStatus == 'Rescheduled') ? 'secondary' : 'disabled';
    return (
        <>
            <Tooltip title='Incomplete'>
                <PendingIcon color={incompleteColor} />
            </Tooltip>
            <Tooltip title='Complete'>
                <CheckCircleIcon color={completeColor} />
            </Tooltip>
            <Tooltip title='Cancelled'>
                <CancelIcon color={cancelledColor} />
            </Tooltip>
            <Tooltip title='Rescheduled'>
                <WatchLaterIcon color={rescheduledColor} />
            </Tooltip>
        </>
    );
};

export default AppointmentStatus;