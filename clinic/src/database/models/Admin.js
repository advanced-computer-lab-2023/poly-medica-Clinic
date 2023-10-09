import mongoose from 'mongoose';
import { ROLES } from '../../utils/Constants.js';

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

const AdminModel = mongoose.model('Admin', Admin);

export default AdminModel;
