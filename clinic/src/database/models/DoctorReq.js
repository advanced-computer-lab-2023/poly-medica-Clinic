import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserSchema from './UserSchema.js';

const DoctorReq = mongoose.Schema({
	userData: {
		type: UserSchema,
		required: true
	},
	speciality: {
		type: String,
		required: true
	},
	hourlyRate: {
		type: Number,
		required: true
	},
	affiliation: {
		type: String,
		required: true
	},
	educationalBackground: {
		type: String,
		required: true
	}
});

DoctorReq.statics.addUser = async function (userData, speciality, hourlyRate, affiliation, educationalBackground){
	const salt = await bcrypt.genSalt();
	userData.password = await bcrypt.hash(userData.password, salt);
	const newRecord = new this({ userData, speciality, hourlyRate, affiliation, educationalBackground });
	const user = await newRecord.save();
	return user;
};



const DoctorReqModel = mongoose.model('DoctorReq', DoctorReq);

export default DoctorReqModel;