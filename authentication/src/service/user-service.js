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
}

export default UserService;