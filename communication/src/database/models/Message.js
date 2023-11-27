import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'chat',
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        reciever: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        content : {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const MessageModel = mongoose.model('message', messageSchema);

export default MessageModel;
