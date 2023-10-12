import mongoose from 'mongoose';
import { ROLES } from '../../utils/Constants.js';
import bcrypt from 'bcrypt';
const Admin = mongoose.Schema({
	role: {
		type: String,
		default: ROLES.ADMIN,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	mainAdmin: {
		type: Boolean,
		default: false,
	},
	//....
});

Admin.statics.addUser = async function (userData, mainAdmin) {
	const salt = await bcrypt.genSalt();
	userData.password = await bcrypt.hash(userData.password, salt);
	const newRecord = new this({ userData, mainAdmin });
	const user = await newRecord.save();
	return user;
};

const AdminModel = mongoose.model('Admin', Admin);

export default AdminModel;

