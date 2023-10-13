import User from '../models/Users.js';
import bcrypt from 'bcrypt';

class UserRepository{
	async signupUser(data){
		const { userId, email, password, userName, type, state } = data;
		const user = await User.signup(userId, email, password, userName, type, state);
		return user;
	}
	async loginUser(req){
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if(user){
			if(password){
				const auth = await bcrypt.compare(password, user.password);
				if(auth){
					return user;
				} 
			}throw Error('incorrect Password');
		} throw Error('incorrect Email');
	}
	async findUserByEmail(email){
		const user = await User.findOne({ email: email }).lean();
		return user;
	}
	async findUserByUserName(userName){
		const user = await User.findOne({ userName: userName }).lean();
		return user;
	}
}

export default UserRepository;