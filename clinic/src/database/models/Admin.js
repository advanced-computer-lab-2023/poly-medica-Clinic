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

Admin.statics.addUser = async function ({ role, userName, password, mainAdmin }) {
	
	const salt = await bcrypt.genSalt();
	password = await bcrypt.hash(password, salt);
	const newRecord = new this({ role, userName, password, mainAdmin });
	const user = await newRecord.save();
	return user;
};

const AdminModel = mongoose.model('Admin', Admin);

export default AdminModel;

