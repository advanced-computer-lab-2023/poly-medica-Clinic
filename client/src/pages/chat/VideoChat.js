import { Typography, Grid, Paper, Button } from '@mui/material';
import { VideoContext } from '../../contexts/VideoChatContext';
import { useContext, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
const VideoChat = () => {
    const {  setName, callAccepted, myVideo, otherUserVideo, callEnded, stream, callUser, leaveCall } = useContext(VideoContext);
    const myVideoRef = useRef();
    const { user } = useUserContext();
    console.log('call accepted = ', callAccepted);
    const ongoingCall = callAccepted && !callEnded;
   // const otherUserVideoRef = useRef();
    const { idToCall } = useParams();
    useEffect(() => {
        if (stream) {
            myVideoRef.current.srcObject = myVideo.current.srcObject;
            setName(user.username);
        }
        if (otherUserVideo.current && callAccepted) {
            console.log('otherUserCurrent: ', otherUserVideo.current.srcObject);
         //   otherUserVideoRef.current.srcObject = otherUserVideo.current.srcObject;
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
                        <Typography>Patient</Typography>
                        <video playsInline muted autoPlay style={{ width: '550px' }} ref={myVideoRef}></video>
                    </Grid>
                </Paper>
            )}
            {ongoingCall && (
                <Paper>
                    <Grid item xs={6}>
                        <Typography>Doctor</Typography>
                        <video playsInline ref={myVideoRef} style={{ width: '550px' }} autoPlay></video>
                    </Grid>
                </Paper>
            )}

            {
                ongoingCall ? (<Button onClick={() => leaveCall()}> End </Button>) : (<Button onClick={() => callUser(idToCall)}> Call </Button>)
            }
        </Grid>
    );
};

export default VideoChat;
