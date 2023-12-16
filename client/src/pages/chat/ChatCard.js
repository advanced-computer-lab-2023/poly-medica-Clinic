import { Card } from '@mui/material';
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import { useChat } from 'contexts/ChatContext';

const ChatCard = ({ setChatOpen }) => {
    const { selectedChat } = useChat();
  return (
    <Card
        sx={{
            backgroundColor: 'transparent',
            height: '100%',
            width: '30%',
            display: 'flex',
            flexDirection: 'row-reverse',
        }}>
            {selectedChat && <ChatBox setChatOpen={ setChatOpen }></ChatBox> }
            {!selectedChat && <ChatList setChatOpen={ setChatOpen }></ChatList> }
        </Card>
  );
};

export default ChatCard;
