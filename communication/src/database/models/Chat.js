import mongoose from 'mongoose';

const chatSchema = mongoose.Schema(
    {
        chatName: {
            type: String,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message',
        },
    },
    { timestamps: true }
);

const ChatModel = mongoose.model('chat', chatSchema);

export default ChatModel;
