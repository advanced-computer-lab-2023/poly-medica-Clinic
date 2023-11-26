import ChatRepository from '../database/repository/chat-repository.js';

class ChatService {
    constructor() {
        this.repository = new ChatRepository();
    }
}

export default ChatService;
