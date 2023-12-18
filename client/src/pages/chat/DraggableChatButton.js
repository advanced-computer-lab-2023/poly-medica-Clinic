import { useDrag } from 'react-dnd';
import { Fab, Badge } from '@mui/material';
import { Transition } from 'react-transition-group';
import ChatIcon from '@mui/icons-material/Chat';
import { useChat } from 'contexts/ChatContext';

const DraggableChatButton = ({ isChatOpen, position, setChatOpen }) => {
  const { messagesNumber } = useChat();

  const [, drag] = useDrag({
    type: 'CHAT_BUTTON',
  });
  const buttonStyle = {
    position: 'absolute',
    left: position.left,
    top: position.top,
    display: isChatOpen? 'none' : 'block',
    transition: 'transform 0.3s',
    transform: isChatOpen ? 'translateY(-50%)' : 'translateY(0)',
    zIndex: '1000',
  };
  setChatOpen;
  return (
    <Transition in={isChatOpen} timeout={300}>
      {(state) => (
        <div ref={drag} style={{ ...buttonStyle , cursor: 'move', opacity: state === 'entering' || state === 'exiting' ? 1 : 1 }}>
          <Badge badgeContent={isChatOpen? 0 : messagesNumber} color='primary'>
            <Fab color="primary" aria-label="chat" onClick={() => setChatOpen(!isChatOpen)}>
              <ChatIcon />
            </Fab>
          </Badge>
        </div>
      )}
    </Transition>
  );
};

export default DraggableChatButton;
