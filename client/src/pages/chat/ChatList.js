import { useEffect } from 'react';
import {
    Divider,
    List,
    ListItemButton,
    ListSubheader,
    ListItemText,
    Paper,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { communicationAxios } from 'pages/utilities/AxiosConfig';
import ChatCard from './ChatCard';
import { useChat } from 'contexts/ChatContext';

const ChatList = () => {
    const { user } = useUserContext();
    const userId = user.id;
    const { socket, setSelectedChat, chats, setChats } = useChat();

    useEffect(() => {
        communicationAxios
            .get(`/chat/${userId}`)
            .then((response) => {
                setChats(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSelectChat = (chat) => {
        setSelectedChat((prevChat) => {
            if (prevChat) {
                socket.emit('leave_room', prevChat._id);
            }
            return chat;
        });
        socket.emit('join_room', chat._id);
    };

    return (
        <Paper
            style={{
                width: '30%',
                height: '100%',
                padding: '0px',
            }}>
            <List
                style={{
                    width: '100%',
                    padding: 0,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: '78vh',
                }}>
                <ListSubheader sx={{ borderTopLeftRadius: 10 }}>
                    <ListItemText
                        primary='My Chats'
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            lineHeight: 3,
                            mb: '2px',
                            borderRadius: 50,
                        }}
                        sx={{ margin: 0 }}
                    />
                    <Divider></Divider>
                </ListSubheader>
                {chats &&
                    chats.map((chat, index) => {
                        return (
                            <ListItemButton
                                sx={{
                                    backgroundColor: '#fafafa',
                                    padding: '2px auto',
                                    marginLeft: 2,
                                    marginRight: 2,
                                    marginTop: 1,
                                }}
                                key={index}
                                onClick={() => handleSelectChat(chat)}>
                                <ChatCard chat={chat} />
                            </ListItemButton>
                        );
                    })}
            </List>
        </Paper>
    );
};

export default ChatList;
