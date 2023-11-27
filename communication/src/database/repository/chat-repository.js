import ChatModel from '../models/Chat.js';
class ChatRepository {
    async createChat(chat) {
        const newChat = await ChatModel.create(chat);
        return newChat;
    }

    async findChats(id) {
        const chats = await ChatModel.find({
            users: { $elemMatch: { $eq: id } },
        }).populate("lastMessage");
        return chats;
    }
}

export default ChatRepository;
