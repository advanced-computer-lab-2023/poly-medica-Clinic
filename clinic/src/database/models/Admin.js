import mongoose from 'mongoose';

const Admin = mongoose.Schema({
	userName: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	mainAdmin: {
		type: Boolean,
		default: false
	},
	//....
});

const AdminModel = mongoose.model('Admin', Admin);

export default AdminModel;