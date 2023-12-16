import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
const Admin = mongoose.Schema({
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true],
	},
	mainAdmin: {
		type: Boolean,
		default: false,
	},
	email:{
		type:String,
		required:true,
		unique: true,
	},
	//....
});

Admin.statics.addUser = async function (userName, email, password, mainAdmin ) {
	const salt = await bcrypt.genSalt();
	password = await bcrypt.hash(password, salt);
	const newRecord = new this({ userName, email, password, mainAdmin });
	const user = await newRecord.save();
	return user;
};

const AdminModel = mongoose.model('Admin', Admin);

export default AdminModel;

