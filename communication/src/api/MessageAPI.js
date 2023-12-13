import MessageService from '../service/message-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import { OK_STATUS_CODE, ERROR_STATUS_CODE } from '../utils/Constants.js';

export const message = (app) => {
	const service = new MessageService();

	app.get('/message/:chatId', async (req, res) => {
		const { chatId } = req.params;
		if (!isValidMongoId(chatId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'chat ID is invalid',
			});
		}
		try {
			const data = await service.getMessages(chatId);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while fetching chat messages',
			});
		}
	});

	app.post('/message', async (req, res) => {
		try {
			const { message } = req.body;
			const data = await service.addMessage(message);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while adding a new message',
				error: err.message,
			});
		}
	});
};
