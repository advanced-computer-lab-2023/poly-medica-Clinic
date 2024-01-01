import { useEffect } from 'react';
import { communicationAxios } from 'pages/utilities/AxiosConfig';
import { Paper, InputBase, List, ListItem, Typography, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { isSender, getReceiverId } from '../../utils/ChatUtils.js';
import { useChat } from 'contexts/ChatContext.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

const ChatBox = ({ setChatOpen }) => {

    const { user } = useUserContext();
    const userId = user.id;
    const { socket, selectedChat, updateChat, setSelectedChat, chatMessages, setChatMessages, newMessage, setNewMessage,  } = useChat();
   
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
                setChatMessages((prevMessages) => {
                    return [response.data, ...prevMessages];
                });
                setNewMessage('');
                updateChat(selectedChat, response.data._id, 1);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Card
            elevation={5}
            style={{
                height: '100%',
                maxHeight: '560px',
                width: '92%',
                padding: '0px',
            }}>
                <CardHeader
                    sx={{
                        paddingBottom: 2,
                        paddingTop: 1,
                    }}
                    avatar={
                    <IconButton onClick={() => setSelectedChat(null)}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={() => {
                            setSelectedChat(null);
                            setChatOpen(false);
                        }}>
                            <CloseIcon />
                        </IconButton>
                    }
                >
                    
                </CardHeader>
                <CardContent
                    sx={{
                        backgroundColor: '#f6f6f6',
                        padding: 0,
                        margin: '8px 24px 16px 24px',
                        height: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                    
                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            width: '100%',
                            height: '100%',
                            padding: 0,
                            backgroundColor: '#f6f6f6',
                            overflowY: 'auto',
                        }}
                        >
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
                </CardContent>
                <CardActions sx={{
                    padding: 0,
                }}>
                    <InputBase
                        sx={{
                            margin: '0px auto',
                            padding: 1,
                            width: '80%',
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
                </CardActions>
            
        </Card>
    );
};

export default ChatBox;
