import { Typography, Grid, Paper, IconButton, Tooltip } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff, Call, CallEnd, RingVolume } from '@mui/icons-material';
import { SocketContext } from '../../contexts/VideoChatContext';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from 'hooks/useUserContext';
import { DOCTOR_TYPE_ENUM } from 'utils/Constants';

const VideoChat = () => {
    const { user } = useUserContext();
    const { name, callAccepted, answerCall, myVideo, userVideo, callEnded, stream, leaveCall, callUser, call, muteMicrophone, unmuteMicrophone, openCamera, closeCamera } = useContext(SocketContext);
    const ongoingCall = callAccepted && !callEnded;
    const { idToCall } = useParams();
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraClosed, setIsCameraClosed] = useState(false);

    const handleToggleMute = () => {
        if (isMuted) {
            unmuteMicrophone();
        } else {
            muteMicrophone();
        }
        setIsMuted(!isMuted);
    };

    const handleToggleCamera = () => {
        if (isCameraClosed) {
            openCamera();
        } else {
            closeCamera();
        }
        setIsCameraClosed(!isCameraClosed);
    };

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
                            {user.userName}
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
                            {user.type === DOCTOR_TYPE_ENUM ? 'Patient' : 'Doctor'}
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
            <Grid item xs={ongoingCall ? 4 : 12} align='center'>
                {ongoingCall ? (
                    <IconButton variant="contained" color="error" onClick={() => leaveCall()}>
                        <CallEnd />
                    </IconButton>
                ) : (
                    <>
                        {((user.type !== DOCTOR_TYPE_ENUM && !call.from) || call.isReceivingCall) ?
                            (<Tooltip title={user.type === DOCTOR_TYPE_ENUM ? 'Answer Call' : 'Call Doctor'}>
                                <IconButton variant="contained" color="primary" onClick={user.type === DOCTOR_TYPE_ENUM ? () => answerCall() : () => callUser(idToCall)}>
                                    {user.type === DOCTOR_TYPE_ENUM ? <RingVolume /> : <Call />}
                                </IconButton>
                            </Tooltip>) : (user.type === DOCTOR_TYPE_ENUM ? <Typography> Patient did not join the call yet</Typography> : <Typography> Waiting for the doctor to answer</Typography>)
                        }
                    </>
                )}
            </Grid>
            <Grid item xs={4} align='center'>
                {ongoingCall &&
                    <IconButton onClick={handleToggleMute} color={isMuted ? 'error' : 'primary'}>
                        {isMuted ? <MicOff /> : <Mic />}
                    </IconButton>
                }
            </Grid>
            <Grid item xs={4} align='center'>
                {ongoingCall &&
                    <IconButton onClick={handleToggleCamera} color={isCameraClosed ? 'error' : 'primary'}>
                        {isCameraClosed ? <VideocamOff /> : <Videocam />}
                    </IconButton>
                }
            </Grid>
        </Grid>
    );
};

export default VideoChat;
