import { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { COMMUNICATION_BASE_URL } from '../utils/Constants';
import { useUserContext } from '../hooks/useUserContext';
export const VideoContext = createContext();
const socket = io(COMMUNICATION_BASE_URL);

export const ContextProvider = ({ children }) => {
    const { user } = useUserContext();
    const [stream, setStream] = useState(null);
    const [videoId, setVideoId] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const [myVideo, setMyVideo] = useState({});
    const [otherUserVideo, setOtherUserVideo] = useState({});
    const connectionRef = useRef();

    useEffect(() => {
        const initializeMediaStream = async () => {
            try {
                const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(currentStream);
                setMyVideo({ current: { srcObject: currentStream } });
                setVideoId(user.id);
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        initializeMediaStream();

        socket.on('setup', user.id);
        socket.on('call_user', ({ from, name: callerName, signal }) => {
            setCall({
                isReceivedCall: true,
                from,
                callerName,
                signal
            });

            console.log('call inside call_user = ', call);
        });
    }, []);

    const answerCall = (id) => {
        console.log(' The user answered the call !! ');
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answer_call', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            setOtherUserVideo(currentStream);
        });

        socket.on('join_room', id);

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        console.log('the user to be called has an id = ', id);
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('call_user', { userToCall: id, signalData: data, from: videoId, name });
        });

        peer.on('stream', (currentStream) => {
            setOtherUserVideo(currentStream);
        });

        socket.on('call_answered', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();

        window.location.reload();
    };
    return (
        <VideoContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            otherUserVideo,
            stream,
            name,
            setName,
            callEnded,
            videoId,
            callUser,
            leaveCall,
            answerCall
        }}>
            {children}
        </VideoContext.Provider>
    );
};


