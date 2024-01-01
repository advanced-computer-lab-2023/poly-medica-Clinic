import mongoose from 'mongoose';

const UserSocketSchema = mongoose.Schema(
	{
		userId: {
			type: String,
		},
		socketId: {
			type: String
		}
	}
);

const UserSocketModel = mongoose.model('UserSocket', UserSocketSchema);

export default UserSocketModel;
