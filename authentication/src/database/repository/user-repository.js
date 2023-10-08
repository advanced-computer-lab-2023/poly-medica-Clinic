import User from "../models/Users.js"

class UserRepository{
    async signupUser(data){
        const { userId, email, password, userName, type, state } = data;
        let user = await User.signup(userId, email, password, userName, type, state);
        return user;
    }
    async loginUser(req){
        const { email, password } = req.body;
        let user = await User.login( email, password );
        return user;
    }
    async findUserByEmail(email){
        let user = await User.findOne({email: email}).lean();
        return user;
    }
    async findUserByUserName(userName){
        let user = await User.findOne({userName: userName}).lean();
        return user;
    }
}

export default UserRepository;