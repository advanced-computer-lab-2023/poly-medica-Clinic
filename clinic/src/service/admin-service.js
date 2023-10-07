import AdminRepository from '../database/repository/admin-repository.js';

class AdminService{

    constructor(){
        this.repository = new AdminRepository();
    }

    async createAdmin(admin){
        const newAdmin = await this.repository.addAdmin(admin);
        return newAdmin;
    }
}

export default AdminService;