import UserRepository from "../database/repository/user-repository.js";

class UserService {
    constructor() {
        this.repository = new UserRepository();

    }

    async signupUser(req) {
        const user = await this.repository.signupUser(req);
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
}

export default UserService;