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
import { DOCTOR_TYPE_ENUM, PATIENT_TYPE_ENUM, PHARMACIST_TYPE_ENUM, PHARMACY_MONGO_ID } from 'utils/Constants';
import { isEqual } from 'lodash';
import { chatExist } from 'utils/ChatUtils';

const ChatList = () => {
    const { user } = useUserContext();
    const userId = user.id,
        userType = user.type;
    const { socket, setSelectedChat, chats, setChats } = useChat();

    useEffect(() => {
        const fetchData = async () => {
            communicationAxios
                .get(`/chat/${userId}`)
                .then((response) => {
                    if (
                        userType === PATIENT_TYPE_ENUM &&
                        !chatExist(response.data, userId, PHARMACY_MONGO_ID) &&
                        !chatExist(response.data, PHARMACY_MONGO_ID, userId)
                    ) {
                        const res = communicationAxios.post('/chat', {
                            chat: {
                                chatName: 'Pharmacy',
                                users: [
                                    {
                                        id: PHARMACY_MONGO_ID,
                                        userType: PHARMACIST_TYPE_ENUM,
                                    },
                                    { id: userId, userType: PATIENT_TYPE_ENUM },
                                ],
                            },
                        });
                        setChats([res.data, ...response.data]);
                    } else {
                        if (!isEqual(response.data, chats)) {
                            setChats(response.data);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchData();
    }, [chats]);

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
                            (userType !== DOCTOR_TYPE_ENUM ||
                                chat.lastMessage ||
                                (chat.users &&
                                    chat.users[1]?.userType ===
                                        PHARMACIST_TYPE_ENUM)) && (
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
                                    {chat && <ChatCard chat={chat} />}
                                </ListItemButton>
                            )
                        );
                    })}
            </List>
        </Paper>
    );
};

export default ChatList;
