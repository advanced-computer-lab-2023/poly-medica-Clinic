import mongoose from 'mongoose';
import UserSchema from './UserSchema.js';
import { ROLES } from '../../utils/Constants.js';

const Doctor = mongoose.Schema({
	userData: {
		type: UserSchema,
		required: true,
	},
	role: {
		type: String,
		default: ROLES.DOCTOR,
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
		required: true
	},
	availableSlots: {
		type: [Date]
	},
});

const DoctorModel = mongoose.model('Doctor', Doctor);

export default DoctorModel;
