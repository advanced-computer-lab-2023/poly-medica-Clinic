import {
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    Button,
} from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import { getDay, getTime } from '../../utils/DateFormatter.js';
import AppointmentStatus from './AppointmentStatus.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { clinicAxios, communicationAxios } from 'pages/utilities/AxiosConfig';
import { useChat } from 'contexts/ChatContext.js';
import { DOCTOR_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants.js';
import { chatExist } from 'utils/ChatUtils.js';

const AppointmentCard = ({ appointment, setSelectedAppointment }) => {
    const { user } = useUserContext();
    const { chats, setChats } = useChat();

    // TODO: move this to a Appointment Details
    // Note: the state is not updated correctly after the patch request
    const handleCompleteAppointment = () => {
        console.log('complete appointment');
        clinicAxios
            .patch(`/appointments/complete/${appointment._id}`)
            .then((response) => {
                const app = response.data;
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
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <ListItemButton onClick={() => setSelectedAppointment(appointment)}>
            <ListItemAvatar sx={{ paddingRight: '2%' }}>
                <TodayIcon />
            </ListItemAvatar>
            <ListItemText
                primary={`${getDay(appointment.date)}`}
                secondary={`at ${getTime(appointment.date)}`}
                sx={{
                    width: '60%',
                    lineHeight: '1.5em',
                    maxHeight: '3em',
                }}
            />
            {
                // TODO: move this to a Appointment Details
                user.type == 'doctor' && (
                    <Button
                        variant='contained'
                        onClick={handleCompleteAppointment}
                        sx={{ marginLeft: 'auto' }}>
                        Complete
                    </Button>
                )
            }
            <AppointmentStatus appointmentStatus={appointment.status} />
        </ListItemButton>
    );
};

export default AppointmentCard;
