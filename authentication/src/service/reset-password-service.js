import ResetPasswordRepository from '../database/repository/reset-password-repository.js';

class ResetPasswordService {
	constructor() {
		this.repository = new ResetPasswordRepository();

	}

	async getRecordByEmail(email){
		const user = await this.repository.getRecordByEmail(email);
		return user;
	}

	async removeRecordByEmail(email){
		const user = await this.repository.removeRecordByEmail(email);
		return user;
	}

	async addRecord(email, OTP){
		const user = await this.repository.addRecord(email, OTP);
		return user;
	}

}

export default ResetPasswordService;