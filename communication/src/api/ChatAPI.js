import ChatService from '../service/chat-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import { ERROR_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const chat = (app) => {
    const service = new ChatService();

    app.get('/chat/:id', async (req, res) => {
        const { id } = req.params;
        if (!isValidMongoId(id)) {
            return res.status(ERROR_STATUS_CODE).json({
                message: 'User ID is invalid',
            });
        }
        try {
            const data = await service.getChats(id);
            res.status(OK_STATUS_CODE).json(data);
        } catch (err) {
            res.status(ERROR_STATUS_CODE).json({
                message: 'error occurred while fetching user chats',
                error: err.message,
            });
        }
    });

    app.post('/chat', async (req, res) => {
        try {
            const { chat } = req.body;
            const data = await service.addChat(chat);
            res.status(OK_STATUS_CODE).json(data);
        } catch (err) {
            res.status(ERROR_STATUS_CODE).json({
                message: 'error occurred while adding a new chat',
                error: err.message,
            });
        }
    });
};
