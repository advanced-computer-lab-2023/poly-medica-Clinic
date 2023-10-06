import mongoose from 'mongoose';
import UserSchema from './UserSchema.js';

const Doctor = mongoose.Schema({
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

const DoctorModel = mongoose.model('Doctor', Doctor);

export default DoctorModel;