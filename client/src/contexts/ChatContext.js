import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { communicationAxios } from '../pages/utilities/AxiosConfig.js';
import {
    COMMUNICATION_BASE_URL,
    PATIENT_TYPE_ENUM,
    PHARMACIST_TYPE_ENUM,
    PHARMACY_MONGO_ID,
} from '../utils/Constants.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { chatExist } from 'utils/ChatUtils.js';
import { isEqual } from 'lodash';
const ChatContext = createContext();

var socket;

export const ChatContextProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [messagesNumber, setMessagesNumber] = useState(0);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const { user } = useUserContext();
    const userId = user.id,
        userType = user.type;

    const updateChat = (updatedChat, messageId, type) => {
        if(type === 0) {
            if(updatedChat.users[0].id === userId) {
                updatedChat.users[0].unseen++;
            } else {
                updatedChat.users[1].unseen++;
            }
        }
        if(type === 1) {
            if(updatedChat.users[0].id === userId) {
                updatedChat.users[1].unseen++;
            } else {
                updatedChat.users[0].unseen++;
            }
        }
        if(type != 2)
            updatedChat.lastMessage = messageId;
        communicationAxios
            .patch('/chat', { chat: updatedChat })
            .then((response) => {
                if(selectedChat && selectedChat._id === response.data._id) {
                    setSelectedChat(response.data);
                }
                setChats((prevChats) => {
                    const newChats = prevChats.map((ch) => {
                        if (ch._id === updatedChat._id) return response.data;
                        return ch;
                    });
                    return [...newChats];
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await communicationAxios.get(
                    `/chat/${userId}`
                );
                if (
                    userType === PATIENT_TYPE_ENUM &&
                    !chatExist(response.data, userId, PHARMACY_MONGO_ID) &&
                    !chatExist(response.data, PHARMACY_MONGO_ID, userId)
                ) {
                    const res = await communicationAxios.post('/chat', {
                        chat: {
                            chatName: 'Pharmacy',
                            users: [
                                {
                                    id: PHARMACY_MONGO_ID,
                                    userType: PHARMACIST_TYPE_ENUM,
                                },
                                { id: userId, userType: PATIENT_TYPE_ENUM },
                            ],
                        },
                    });
                    setChats([res.data, ...response.data]);
                } else {
                    if (!isEqual(response.data, chats)) {
                        setChats(response.data);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };

        const updateMessagesNumber = () => {
            let tot = 0;
            console.log(chats);
            chats.map(chat => {
                if(chat && chat.users) {
                    chat.users.map(user => {
                        if(user.id === userId) {
                            tot += user.unseen;
                        }
                    });
                }
            });
            setMessagesNumber(tot);
        };
        fetchData();
        updateMessagesNumber();
    }, [chats]);

    useEffect(() => {
        if(!socket)
            return;
        const handleReceiveMessage = (data) => {
            updateChat(data.selectedChat, data.message._id, 0);
            if (selectedChat && selectedChat._id === data.room) {
                selectedChat.users.map(user => {
                    if(user.id === userId) {
                        user.unseen = 0;
                    }
                    return user;
                });
                socket.emit('message_seen', {
                    sender: userId,
                    chat: selectedChat,
                });
                setChatMessages((prevMessages) => [
                    data.message,
                    ...prevMessages,
                ]);
                setSelectedChat(selectedChat);
            }
        };

        const handleUpdateChatSeen = (data) => {
            updateChat(data.chat, null, 2);
        };

        socket.on('receive_message', handleReceiveMessage);
        socket.on('update_chat_seen', handleUpdateChatSeen);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
            socket.off('update_chat_seen', handleUpdateChatSeen);
        };
    }, [selectedChat, socket]);

    useEffect(() => {
        console.log(chats);
    }, [chats]);

    return (
        <ChatContext.Provider
            value={{
                socket,
                selectedChat,
                setSelectedChat,
                updateChat,
                chats,
                setChats,
                messagesNumber,
                chatMessages,
                setChatMessages,
                newMessage,
                setNewMessage,
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
