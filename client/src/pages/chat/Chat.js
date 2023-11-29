import ChatBox from './ChatBox';
import ChatList from './ChatList';
import { Card } from '@mui/material';

const Chat = () => {
    
    return (
        <Card
            sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'space-between',
                height: '100%',
            }}>
            <ChatBox></ChatBox>
            <ChatList></ChatList>
        </Card>
    );
};

export default Chat;
