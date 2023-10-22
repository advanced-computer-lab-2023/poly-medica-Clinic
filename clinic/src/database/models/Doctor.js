import mongoose from 'mongoose';
import UserSchema from './UserSchema.js';
import { ZERO } from '../../utils/Constants.js';

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
		default: [],
	},
	walletAmount: {
		type: Number,
		default: 0, 
		validate: {
			validator: function (v) {
				return v >= ZERO;
			},
			message: (props) => `${props.value} is not a valid wallet amount!`,
		},
	},
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
