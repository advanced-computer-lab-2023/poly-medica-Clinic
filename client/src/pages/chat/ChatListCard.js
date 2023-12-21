import { CardHeader, Avatar, Badge } from '@mui/material';
import { getReceiver, getUserName } from 'utils/ChatUtils';
import { useUserContext } from 'hooks/useUserContext';
import { useState, useEffect } from 'react';

const ChatListCard = ({ chat }) => {
    const { user } = useUserContext();
    const [unseen, setUnseen] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        if(chat.users[0].id === user.id) {
            setUnseen(chat.users[0].unseen);
        } else {
            setUnseen(chat.users[1].unseen);
        }
        console.log(chat);
    }, [chat]);

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
                width: '100%',
                padding: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
            avatar={
                <Avatar sx={{ bgcolor: '#f3f3f3' }} aria-label='recipe'>
                    {name.charAt(0).toUpperCase()}
                </Avatar>
            }
            action={<Badge badgeContent={unseen} color='primary' sx={{ marginRight: 5, marginTop: 3 }} ></Badge>}
            title={name}
            subheader={chat.lastMessage && chat.lastMessage.content}
        />
    );
};

export default ChatListCard;
