import mongoose from "mongoose";
import UserSchema from "./UserSchema.js";

const Admin = mongoose.Schema({
    userData: {
        type: UserSchema,
        required: true
    },
    mainAdmin: {
        type: Boolean
    },
    //....
});

Admin.static.addUser = async function (userData, mainAdmin){
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
    const newRecord = new AdminModel({userData, mainAdmin});
    let user = await newRecord.save();
    return user;
};

const AdminModel = mongoose.model('Admin', Admin);

export default AdminModel;