import AdminRepository from '../database/repository/admin-repository.js';

class AdminService{

    constructor() {
        this.repository = new AdminRepository();

    }

    async addAdmin(req){
        const adminUser = await this.repository.addAdmin(req);
        return adminUser;
    }
}

export default AdminService;