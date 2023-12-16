import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { communicationAxios } from '../pages/utilities/AxiosConfig.js';
import {
    COMMUNICATION_BASE_URL,
    PHARMACIST_TYPE_ENUM,
    PHARMACY_MONGO_ID,
} from '../utils/Constants.js';
import { useUserContext } from 'hooks/useUserContext.js';
const ChatContext = createContext();

var socket;

export const ChatContextProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);

    const { user } = useUserContext();
    const userId = user.id,
        userType = user.type;

    const updateChat = (updatedChat, messageId) => {
        updatedChat.lastMessage = messageId;
        communicationAxios
            .patch('/chat', { chat: updatedChat })
            .then((response) => {
                setChats((prevChats) => {
                    const newChats = prevChats.map((ch) => {
                        if (ch._id === updatedChat._id) return response.data;
                        return ch;
                    });
                    return newChats;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        socket = io.connect(COMMUNICATION_BASE_URL);
        socket.emit(
            'setup',
            userType === PHARMACIST_TYPE_ENUM ? PHARMACY_MONGO_ID : userId
        );
    }, []);

    return (
        <ChatContext.Provider
            value={{
                socket,
                selectedChat,
                setSelectedChat,
                updateChat,
                chats,
                setChats,
            }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
