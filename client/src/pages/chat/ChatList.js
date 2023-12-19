import { useRef } from 'react';
import {
    Divider,
    List,
    ListItemButton,
    Card,
    IconButton,
    CardHeader,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import ChatListCard from './ChatListCard';
import { useChat } from 'contexts/ChatContext';
import {
    DOCTOR_TYPE_ENUM,
    PHARMACIST_TYPE_ENUM,
} from 'utils/Constants';
import CloseIcon from '@mui/icons-material/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';

const ChatList = ({ setChatOpen }) => {
    const { user } = useUserContext();
    const userId = user.id, userType = user.type;
    const { socket, setSelectedChat, chats, updateChat } = useChat();
    
    const socketRef = useRef(socket);

    const handleSelectChat = (chat) => {
        chat.users.map(user => {
            if(user.id === userId) {
                user.unseen = 0;
            }
            return user;
        });
        socketRef.current.emit('message_seen', {
            sender: user.id,
            chat,
        });
        updateChat(chat, null, 2);
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
                height: '100%',
                maxHeight: '560px',
                width: '92%',
                padding: '0px'
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
                                        {chat && <ChatListCard chat={chat} />}
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
