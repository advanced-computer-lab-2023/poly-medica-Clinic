import AdminModel from "../models/Admin.js";

class AdminRepository {
  async addAdmin(admin) {
    const newAdmin = await AdminModel.create(admin);
    return newAdmin;
  }
}

export default AdminRepository;
