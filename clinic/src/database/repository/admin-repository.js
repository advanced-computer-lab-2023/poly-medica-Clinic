import AdminModel from '../models/Admin.js';

class AdminRepository {
	async addAdmin(admin) {
		const newAdmin = await AdminModel.create(admin);
		return newAdmin;
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
