import { INCORRECT_PASSWORD_ERROR_MESSAGE, INCORRECT_USER_ERROR_MESSAGE } from '../../utils/Constants.js';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';

class UserRepository {
	async signupUser(data) {
		const { userId, email, password, userName, type } = data;
		const user = await User.signup(
			userId,
			email,
			password,
			userName,
			type,
		);
		return user;
	}

	async loginUser(req) {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName: userName }).lean();
		if (user) {
			if (password) {
				const auth = await bcrypt.compare(password, user.password);
				if (auth) {
					return user;
				}
			}
			throw Error(INCORRECT_PASSWORD_ERROR_MESSAGE);
		}
		throw Error(INCORRECT_USER_ERROR_MESSAGE);
	}
	async findUserByEmail(email) {
		const user = await User.findOne({ email: email }).lean();
		return user;
	}
	async findUserByUserName(userName) {
		const user = await User.findOne({ userName: userName }).lean();
		return user;
	}

	async deleteUser(userId) {
		const user = await User.deleteOne({ userId: userId }).lean();
		return user;
	}

	async updatePassword(userId, password){
		let user = await User.findOne({ userId: userId })
		const salt = await bcrypt.genSalt();
		password = await bcrypt.hash(password, salt);
		user.password = password;
		user = await user.save();
		return user;
	}

	async updateEmail(id, email){
		let user = await User.findOne({userId: id});
		console.log(id, email, {user});
		user.email = email;
		user = await user.save();
		return user;
	}
}

export default UserRepository;
