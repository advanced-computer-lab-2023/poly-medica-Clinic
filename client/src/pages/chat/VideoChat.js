import { Typography, Grid, Paper, Button } from '@mui/material';
import { VideoContext } from '../../contexts/VideoChatContext';
import { useContext, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

const VideoChat = () => {
    const {
        setName,
        callAccepted,
        myVideo,
        otherUserVideo,
        callEnded,
        stream,
        callUser,
        leaveCall,
    } = useContext(VideoContext);

    const myVideoRef = useRef();
    const { user } = useUserContext();
    const ongoingCall = callAccepted && !callEnded;
    const otherUserVideoRef = useRef();
    const { idToCall } = useParams();

    useEffect(() => {
        if (stream) {
            myVideoRef.current.srcObject = myVideo.current.srcObject;
            setName(user.username);
        }

        if (otherUserVideo.current && callAccepted) {
            otherUserVideoRef.current.srcObject = otherUserVideo.current.srcObject;
        }
    }, [stream, callAccepted, otherUserVideo]);

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h2" sx={{ marginBottom: '2%' }}>
                    Video Chat
                </Typography>
            </Grid>
            {stream && (
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: '3%', textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                            Your Video
                        </Typography>
                        <video
                            playsInline
                            muted
                            autoPlay
                            style={{ width: '100%', borderRadius: '8px' }}
                            ref={myVideoRef}
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
                            ref={otherUserVideoRef}
                            style={{ width: '100%', borderRadius: '8px' }}
                            autoPlay
                        ></video>
                    </Paper>
                </Grid>
            )}

            <Grid item xs={12}>
                {ongoingCall ? (
                    <Button variant="contained" color="error" onClick={() => leaveCall()}>
                        End Call
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={() => callUser(idToCall)}>
                        Call
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default VideoChat;
