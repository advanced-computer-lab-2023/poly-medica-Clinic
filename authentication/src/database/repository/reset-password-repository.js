import ResetPassword from "../models/ResetPassword.js";

class ResetPasswordRepository{
    async getRecordByEmail(email){
        const user = await ResetPassword.findOne({email: email});
        return user;
    }

    async removeRecordByEmail(email){
        const user = await ResetPassword.deleteOne({email: email});
        return user;
    }

    async addRecord(email, OTP){
        const record = new ResetPassword({email, OTP});
        await record.save();
    }
}

export default ResetPasswordRepository;