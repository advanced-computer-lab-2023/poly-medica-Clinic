import AdminModel from '../models/Admin.js';
import { ADMIN_PROJECTION } from '../../utils/Constants.js';

class AdminRepository {
	async findAllAdmins() {
		const admins = await AdminModel.find().select(ADMIN_PROJECTION);
		return admins;
	}

	async addAdmin(body){
		const { role, userName, password, mainAdmin } = body;
		const user = await AdminModel.addUser(role, userName, password, mainAdmin);
		return user;
	}

	async findAdminById(id) {
		const admin = await AdminModel.findById(id);
		return admin;
	}

	async deleteAdmin(id) {
		const deletedAdmin = await AdminModel.findByIdAndDelete(id);
		return deletedAdmin;
	}
}

export default AdminRepository;

