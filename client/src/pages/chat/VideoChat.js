import { Typography, Grid, Paper, Button } from '@mui/material';
import { VideoContext } from '../../contexts/VideoChatContext';
import { useContext, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
const VideoChat = () => {
    const {  setName, name, callAccepted, myVideo, otherUserVideo, callEnded, stream, call, callUser, leaveCall } = useContext(VideoContext);
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
        if (callAccepted && otherUserVideo) {
            otherUserVideoRef.current.srcObject = otherUserVideo;
        }
    }, [stream, callAccepted, otherUserVideo]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant='h2' sx={{ marginBottom: '2%' }}>
                    Video Chat
                </Typography>
            </Grid>
            {stream && (
                <Paper>
                    <Grid item xs={6}>
                        <Typography>{name}</Typography>
                        <video playsInline muted autoPlay style={{ width: '550px' }} ref={myVideoRef}></video>
                    </Grid>
                </Paper>
            )}
            {ongoingCall && (
                <Paper>
                    <Grid item xs={6}>
                        <Typography>{call.name}</Typography>
                        <video playsInline ref={otherUserVideoRef} style={{ width: '550px' }} autoPlay></video>
                    </Grid>
                </Paper>
            )}

            {
                ongoingCall ? (<Button onClick={() => leaveCall()}> Hang up </Button>) : (<Button onClick={() => callUser(idToCall)}> Call </Button>)
            }
        </Grid>
    );
};

export default VideoChat;
