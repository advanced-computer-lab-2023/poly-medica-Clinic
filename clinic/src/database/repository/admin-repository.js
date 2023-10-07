import AdminModel from '../models/Admin.js';

class AdminRepository{


    async addAdmin(req){
        const { userData, mainAdmin } = req.body;
        const user = await AdminModel.addUser(userData, mainAdmin);
        return user;
    }
}

export default AdminRepository;