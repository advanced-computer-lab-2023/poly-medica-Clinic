import { useEffect, useRef } from 'react';
import {
    Divider,
    List,
    ListItemButton,
    Card,
    IconButton,
    CardHeader,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { communicationAxios } from 'pages/utilities/AxiosConfig';
import ChatCard from './ChatListCard';
import { useChat } from 'contexts/ChatContext';
import {
    DOCTOR_TYPE_ENUM,
    PATIENT_TYPE_ENUM,
    PHARMACIST_TYPE_ENUM,
    PHARMACY_MONGO_ID,
} from 'utils/Constants';
import { isEqual } from 'lodash';
import { chatExist } from 'utils/ChatUtils';
import CloseIcon from '@mui/icons-material/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';

const ChatList = ({ setChatOpen }) => {
    const { user } = useUserContext();
    const userId = user.id,
        userType = user.type;
    const { socket, setSelectedChat, chats, setChats } = useChat();

    const socketRef = useRef(socket);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await communicationAxios.get(
                    `/chat/${userId}`
                );
                if (
                    userType === PATIENT_TYPE_ENUM &&
                    !chatExist(response.data, userId, PHARMACY_MONGO_ID) &&
                    !chatExist(response.data, PHARMACY_MONGO_ID, userId)
                ) {
                    const res = await communicationAxios.post('/chat', {
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
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [chats]);

    const handleSelectChat = (chat) => {
        setSelectedChat((prevChat) => {
            if (prevChat) {
                socketRef.current.emit('leave_room', prevChat._id);
            }
            return chat;
        });
        socketRef.current.emit('join_room', chat._id);
    };

    return (
        <Card
            elevation={5}
            style={{
                height: '90%',
                width: '92%',
                padding: '0px',
            }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={() => setChatOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                }
                title= 'My Chats'
            />
            <Divider />
            <PerfectScrollbar>
            <List
                style={{
                    width: '100%',
                    padding: 0,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    
                }}>
                {chats &&
                    chats.map((chat, index) => {
                        return ( chat &&
                            <div key={index}>
                                {(userType !== DOCTOR_TYPE_ENUM ||
                                    chat.lastMessage ||
                                    (chat.users &&
                                        chat.users[0]?.userType !==
                                            PHARMACIST_TYPE_ENUM)) && (
                                    <>
                                    <ListItemButton
                                        sx={{
                                            backgroundColor: '#fafafa',
                                            padding: '2px auto',
                                            marginLeft: 2,
                                            marginRight: 2,
                                           
                                        }}
                                    
                                        onClick={() => handleSelectChat(chat)}>
                                        {chat && <ChatCard chat={chat} />}
                                        {console.log('chat === ', chat)}
                                    </ListItemButton>
                                    </>
                                )}
                            </div>
                        );
                    })}
            </List>
            </PerfectScrollbar>
        </Card>
    );
};

export default ChatList;
