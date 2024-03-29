import UserRepository from '../database/repository/user-repository.js';

class UserService {
	constructor() {
		this.repository = new UserRepository();

	}

	async signupUser(data) {
		const user = await this.repository.signupUser(data);
		return user;
	}

	async loginUser(req) {
		const user = await this.repository.loginUser(req);
		return user;
	}

	async findUserByEmail(email){
		const user = await this.repository.findUserByEmail(email);
		return user;
	}

	async findUserByUserName(userName){
		const user = await this.repository.findUserByUserName(userName);
		return user;
	}

	async deleteUser(userId){
		const user = await this.repository.deleteUser(userId);
		return user;
	}

	async updatePassword(userId, password){
		const user  = await this.repository.updatePassword(userId, password);
		return user;
	}

	async getuserEmail(id){
		const userEmail = await this.repository.getUserEmail(id);
		return userEmail;
	}

	async updateEmail(id, email) {
		const systemUser = await this.repository.updateEmail(id, email);
		return systemUser;
	}

	async getPharmacistid(){
		const pharmacits = await this.repository.getPharmacistid();
		return pharmacits;
	}
}

export default UserService;