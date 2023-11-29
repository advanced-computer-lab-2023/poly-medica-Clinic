import { CardHeader, Avatar } from '@mui/material';
import { getReceiver, getUserName } from 'utils/ChatUtils';
import { useUserContext } from 'hooks/useUserContext';
import { useState, useEffect } from 'react';

const ChatCard = ({ chat }) => {
    const { user } = useUserContext();
    const userId = user.id;
    const [name, setName] = useState('');

    useEffect(() => {
        getUserName(getReceiver(userId, chat.users)).then((res) => {
            setName(res);
        });
    }, []);
    return (
        <CardHeader
            sx={{
                padding: '0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
            avatar={
                <Avatar sx={{ bgcolor: '#f3f3f3' }} aria-label='recipe'>
                    {name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={name}
            subheader={chat.lastMessage && chat.lastMessage.content}
        />
    );
};

export default ChatCard;
