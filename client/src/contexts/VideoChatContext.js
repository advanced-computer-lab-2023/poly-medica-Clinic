import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { COMMUNICATION_BASE_URL } from '../utils/Constants';
import { useUserContext } from '../hooks/useUserContext';

const SocketContext = createContext();

const socket = io(COMMUNICATION_BASE_URL);

const ContextProvider = ({ children }) => {
    const { user } = useUserContext();
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    // const [myVideo, setMyVideo] = useState({});
    // const [userVideo, setUserVideo] = useState({});
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();



    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {

                setStream(currentStream);
                setTimeout(() => {
                    if (myVideo.current)
                        myVideo.current.srcObject = currentStream;
                    console.log('video curr = ', myVideo.current);
                }, 1000);


            });
        console.log('inside useEffect');
        console.log('userId: ', user);

        socket.on('me', (id) => setMe(id));


        socket.on('callUser', ({ from, name: callerName, signal }) => {
            console.log('inside callUser');
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });

        socket.emit('ready', { userId: user.id });

        console.log('call = ', call);
    }, [call]);

    const answerCall = () => {
        setCallAccepted(true);
        console.log('stream = ', stream);
        const peer = new Peer({ initiator: false, trickle: false, stream });
        console.log('peer = ', peer);
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            setTimeout(() => {
                if (userVideo.current) {
                    userVideo.current.srcObject = currentStream;
                }
            }, 1000);
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        console.log('inside call user with id = ', id);
        const peer = new Peer({ initiator: true, trickle: false, stream });

        socket.on('hello', () => {
            console.log('inside hello');
        });

        socket.on('callAccepted', (signal) => {
            console.log('inside call accepted');
            setCallAccepted(true);
            peer.signal(signal);
        });

        peer.on('signal', (data) => {
            setTimeout(() => {
                console.log('me = ', me);
                socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
            }, 1000);
        });

        peer.on('stream', (currentStream) => {
            setTimeout(() => {
                if (userVideo.current) {
                    console.log('inside currentStream ', currentStream);
                    userVideo.current.srcObject = currentStream;
                }
            }, 1000);
        });


        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
