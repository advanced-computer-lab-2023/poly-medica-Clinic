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

const AdminModel = mongoose.model('Admin', Admin);

export default AdminModel;