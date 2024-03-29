import ChatRepository from '../database/repository/chat-repository.js';

class ChatService {
	constructor() {
		this.repository = new ChatRepository();
	}

	async addChat(chat) {
		const newChat = await this.repository.createChat(chat);
		return newChat;
	}

	async getChats(id) {
		const chats = await this.repository.findChats(id);
		return chats;
	}

	async updateChat(chat) {
		const updatedChat = await this.repository.updateChat(chat);
		return updatedChat;
	}
}

export default ChatService;
