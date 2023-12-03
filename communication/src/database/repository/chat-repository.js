import ChatModel from '../models/Chat.js';
import { ONE } from '../../utils/Constants.js';
class ChatRepository {
	async createChat(chat) {
		const newChat = await ChatModel.create(chat);
		return newChat;
	}

	async findChats(userId) {
		const chats = await ChatModel.find({
			users: {
				$elemMatch: {
					id: { $eq: userId },
				},
			},
		})
			.populate('lastMessage')
			.sort({ updatedAt: -ONE, lastMessage: ONE });
		return chats;
	}

	async updateChat(chat) {
		const updatedChat = await ChatModel.findOneAndUpdate(
			{ _id: chat._id },
			chat,
			{ new: true, runValidators: true }
		).populate('lastMessage');
		return updatedChat;
	}
}

export default ChatRepository;
