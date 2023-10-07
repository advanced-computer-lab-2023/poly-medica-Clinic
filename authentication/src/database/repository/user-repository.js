import User from "../models/Users.js"

class UserRepository{
    async signupUser(req){
        const { _id, email, password, userName, type, state } = req.body;
        let user = await User.signup(_id, email, password, userName, type, state);
        return user;
    }

    async loginUser(req){
        const { email, password } = req.body;
        let user = await User.login( email, password );
        return user;
    }
}

export default UserRepository;