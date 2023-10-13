import mongoose from 'mongoose';
import { USER_ARR_ENUM } from '../../utils/Constants.js';

const userSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true,
	},
	email: {
		type: String,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: USER_ARR_ENUM,
		required: true,
	},
});

userSchema.statics.signup = async function (
	userId,
	email,
	password,
	userName,
	type,
	state,
) {
	const userRecord = new this({
		userId: new mongoose.Types.ObjectId(userId),
		email,
		password,
		userName,
		type,
		state,
	});
	const result = await userRecord.save();
	return result;
};

const User = mongoose.model('User', userSchema);

export default User;
