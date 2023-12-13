import MessageModel from '../models/Message.js';
import { ONE } from '../../utils/Constants.js';

class MessageRepository {
	async createMessage(message) {
		const newMessage = await MessageModel.create(message);
		return newMessage;
	}

	async findMessages(chatId) {
		const messages = MessageModel.find({ chatId }).sort({
			createdAt: -ONE,
		});
		return messages;
	}
}

export default MessageRepository;
