import { CardHeader, Avatar } from '@mui/material';
import { getReceiver, getUserName } from 'utils/ChatUtils';
import { useUserContext } from 'hooks/useUserContext';
import { useState, useEffect } from 'react';

const ChatCard = ({ chat }) => {
    const { user } = useUserContext();
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userName = await getUserName(
                    getReceiver(user, chat.users)
                );
                setName(userName);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUserName();
    }, [user, chat.users]);
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
