import MessageRepository from '../database/repository/message-repository.js';

class MessageService {
	constructor() {
		this.repository = new MessageRepository();
	}

	async addMessage(message) {
		const newMessage = await this.repository.createMessage(message);
		return newMessage;
	}

	async getMessages(chatId) {
		const messages = await this.repository.findMessages(chatId);
		return messages;
	}
}

export default MessageService;
