import { useState, useEffect, useRef } from 'react';
import { communicationAxios } from 'pages/utilities/AxiosConfig';
import { Paper, InputBase, List, ListItem, Typography } from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { isSender, getReceiverId } from '../../utils/ChatUtils.js';
import { useChat } from 'contexts/ChatContext.js';

const ChatBox = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const { user } = useUserContext();
    const userId = user.id;
    const { socket, selectedChat, updateChat } = useChat();

    useEffect(() => {
        if (!selectedChat) return;
        communicationAxios
            .get(`/message/${selectedChat._id}`)
            .then((response) => {
                setChatMessages(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedChat]);

    const sendMessage = (data) => {
        const message = {
            message: {
                chatId: selectedChat._id,
                sender: userId,
                reciever: getReceiverId(userId, selectedChat.users),
                content: data,
            },
        };
        communicationAxios
            .post('/message', message)
            .then((response) => {
                socket.emit('send_message', {
                    message: response.data,
                    userId,
                    selectedChat,
                    room: selectedChat._id,
                });
                updateChat(selectedChat, response.data._id);
                setChatMessages((prevMessages) => {
                    return [response.data, ...prevMessages];
                });
                setNewMessage('');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const socketRef = useRef(socket);
    useEffect(() => {
        const handleReceiveMessage = (data) => {
            updateChat(data.selectedChat, data.message._id);
            if (selectedChat && selectedChat._id === data.room) {
                setChatMessages((prevMessages) => [
                    data.message,
                    ...prevMessages,
                ]);
            }
        };

        socketRef.current.on('receive_message', handleReceiveMessage);

        return () => {
            socketRef.current.off('receive_message', handleReceiveMessage);
        };
    }, [selectedChat]);

    return (
        <Paper
            style={{
                width: '67%',
                height: '100%',
                padding: '0px',
            }}>
            {selectedChat && (
                <Paper
                    sx={{
                        height: '100%',
                        margin: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            width: '100%',
                            padding: 2,
                            backgroundColor: '#fafafa',
                            overflowY: 'auto',
                            height: '65vh',
                            maxHeight: '65vh',
                        }}>
                        {chatMessages.map((message, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: isSender(
                                            userId,
                                            message
                                        )
                                            ? 'flex-end'
                                            : 'flex-start',
                                        padding: 1,
                                    }}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            padding: '10px',
                                            backgroundColor: isSender(
                                                userId,
                                                message
                                            )
                                                ? '#4CAF50'
                                                : '#2196F3',
                                            color: '#fff',
                                            borderRadius: '10px',
                                            maxWidth: '40%',
                                            whiteSpace: 'normal',
                                        }}>
                                        <Typography
                                            variant='body1'
                                            sx={{ wordWrap: 'break-word' }}>
                                            {message.content}
                                        </Typography>
                                    </Paper>
                                </ListItem>
                            );
                        })}
                    </List>
                    <InputBase
                        sx={{
                            margin: '0px auto',
                            marginTop: 2,
                            padding: 1,
                            width: '95%',
                            backgroundColor: '#f5f5f5',
                        }}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder=' Type a message'
                        onKeyDownCapture={(e) => {
                            if (e.key == 'Enter' && newMessage) {
                                sendMessage(e.target.value);
                            }
                        }}
                    />
                </Paper>
            )}
        </Paper>
    );
};

export default ChatBox;
