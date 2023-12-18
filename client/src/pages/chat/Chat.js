import { Container } from '@mui/system';
import ChatCard from './ChatCard';
import DraggableChatButton from './DraggableChatButton';
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

const Chat = ({ children }) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [position, setPosition] = useState({
    left: window.innerWidth - window.innerWidth * 0.25,
    top: window.innerHeight - window.innerHeight * 0.22,
  });

  const handleDrop = (delta) => {
    const newLeft = Math.max(position.left + delta.x, 0);
    const newTop = Math.max(position.top + delta.y, 0);

    setPosition({
      left: newLeft,
      top: newTop,
    });
  };

  const [, drop] = useDrop({
    accept: 'CHAT_BUTTON',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        handleDrop(delta);
      }
    },
  });

  const containerStyle = {
    marginLeft: '0px',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    position: 'relative',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)', // Center the container
    padding: 3,
  };

  const updatePosition = () => {
    setPosition({
      left: window.innerWidth - window.innerWidth * 0.25,
      top: window.innerHeight - window.innerHeight * 0.22,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  const childrenWithStyles = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      style: {
        ...child.props.style,
        display: isChatOpen && window.innerWidth < 1000? 'none' : 'block',
        pointerEvents: isChatOpen ? 'none' : 'auto',
        opacity: isChatOpen ? 0.5 : 1,
        width: isChatOpen ? '70%' : '100%',
      },
    });
  });

  return (
    <Container ref={drop} sx={containerStyle}>
      <DraggableChatButton isChatOpen={isChatOpen} position={position} setChatOpen={setChatOpen} />
      {childrenWithStyles}
      {isChatOpen && <ChatCard setChatOpen={setChatOpen} />}
    </Container>
  );
};

export default Chat;
