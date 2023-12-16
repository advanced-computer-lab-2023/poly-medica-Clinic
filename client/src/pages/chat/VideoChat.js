import { Typography, Grid, Paper, Button } from '@mui/material';
import { SocketContext } from '../../contexts/VideoChatContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from 'hooks/useUserContext';
import { DOCTOR_TYPE_ENUM } from 'utils/Constants';

const VideoChat = () => {
    const { user } = useUserContext();
    const { name, callAccepted, answerCall, myVideo, userVideo, callEnded, stream, leaveCall, callUser, call } = useContext(SocketContext);
    const ongoingCall = callAccepted && !callEnded;
    const { idToCall } = useParams();
    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h2" sx={{ marginBottom: '2%' }}>
                    {name}
                </Typography>
            </Grid>
            {stream && (
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: '3%', textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                            Patient
                        </Typography>
                        <video
                            playsInline
                            muted
                            autoPlay
                            style={{ width: '100%', borderRadius: '8px' }}
                            ref={myVideo}
                        ></video>
                    </Paper>
                </Grid>
            )}

            {ongoingCall && (
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: '3%', textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                            Doctor
                        </Typography>
                        <video
                            playsInline
                            ref={userVideo}
                            style={{ width: '100%', borderRadius: '8px' }}
                            autoPlay
                        ></video>
                    </Paper>
                </Grid>
            )}
            <Grid item xs={12} align='center'>
                {ongoingCall ? (
                    <Button variant="contained" color="error" onClick={() => leaveCall()}>
                        End Call
                    </Button>
                ) : (
                    (user.type !== DOCTOR_TYPE_ENUM || call.isReceivingCall) &&
                    <Button variant="contained" color="primary" onClick={user.type === DOCTOR_TYPE_ENUM ? () => answerCall() : () => callUser(idToCall)}>
                        {user.type === DOCTOR_TYPE_ENUM ? 'Answer Call' : 'Call Doctor'}
                    </Button>
                )}

            </Grid>
        </Grid>
    );
};

export default VideoChat;
