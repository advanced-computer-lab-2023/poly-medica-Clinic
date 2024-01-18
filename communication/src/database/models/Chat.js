import mongoose from 'mongoose';

const chatSchema = mongoose.Schema(
	{
		chatName: {
			type: String,
		},
		users: [
			{
				id: {
					type: mongoose.Schema.Types.ObjectId,
				},
				userType: {
					type: String,
				},
				unseen: {
					type: Number,
					default: 0,
				}
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
