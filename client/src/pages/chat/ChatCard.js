import { Card } from '@mui/material';
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import { useChat } from 'contexts/ChatContext';

const ChatCard = ({ setChatOpen }) => {
  const { selectedChat } = useChat();

  const cardStyle = {
    position: window.innerWidth < 1000 ? 'static' : 'fixed',
    right: window.innerWidth < 1000 ? 'auto' : 16,
    backgroundColor: 'transparent',
    height: window.innerWidth < 1000? '100%' : '70%',
    width: window.innerWidth < 1000 ? '70%' : '25%', // Adjusted width for smaller screens
    display: 'flex',
    justifyContent: 'space-around',
  };

  return (
    <Card sx={cardStyle}>
      {!selectedChat && <ChatList setChatOpen={setChatOpen}></ChatList>}
      {selectedChat && <ChatBox setChatOpen={setChatOpen}></ChatBox>}
    </Card>
  );
};

export default ChatCard;
