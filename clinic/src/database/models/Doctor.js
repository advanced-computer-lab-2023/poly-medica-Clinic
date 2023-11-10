import mongoose from 'mongoose';
import UserSchema from './UserSchema.js';
 
const Doctor = mongoose.Schema({
	userData: {
		type: UserSchema,
		required: true,
	},
	speciality: {
		type: String,
		required: true,
	},
	hourlyRate: {
		type: Number,
		required: true,
	},
	affiliation: {
		type: String,
		required: true,
	},
	educationalBackground: {
		type: String,
		required: true,
	},
	
	availableSlots: {
		type: Array,
		default: [
			{
				from: new Date(),
				until: new Date()
			},
		],
		
	},
	status:{
		type: Boolean,
		default: false,
		
	}
});
 

Doctor.statics.addUser = async function (
	userData,
	speciality,
	hourlyRate,
	affiliation,
	educationalBackground
) {
	const newRecord = new this({
		userData,
		speciality,
		hourlyRate,
		affiliation,
		educationalBackground,
	});
	const user = await newRecord.save();
	return user;
};

const DoctorModel = mongoose.model('Doctor', Doctor);

export default DoctorModel;
