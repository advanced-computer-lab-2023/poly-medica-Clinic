import mongoose from 'mongoose';
import { FAMILIY_EMERGENCY, GENDERS, HEALTH_PACKAGE_STATUS, FAMILY_RELATIONS } from '../../utils/Constants.js';
import bcrypt from 'bcrypt';

const patientSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	userName: {
		type: String,
		required: true,
		unique: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	dateOfBirth: {
		type: Date,
		required: true,
	},
	gender: {
		type: String,
		enum: GENDERS,
		required: true,
	},
	mobileNumber: {
		type: String,
		required: true,
	},
	emergencyContact: {
		name: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			required: true,
		},
		relation: {
			type: String,
			required: true,
			enum: FAMILIY_EMERGENCY,
		},
	},
	familyMembers: [
		{
			name: {
				type: String,
				required: true,
			},
			nationalId: {
				type: String,
				required: true,
				unique: true,
				sparse: true,
			},
			age: {
				type: Number,
				required: true,
			},
			gender: {
				type: String,
				enum: GENDERS,
				required: true,
			},
			relation: {
				type: String,
				enum: FAMILY_RELATIONS,
				required: true,
			},
			email: {
				type: String
			},
			mobileNumber: {
				type: String
			}
		},
	],
	healthRecords: [
		{
			recordTitle: {
				type: String,
			},
			documentName: {
				type: String,
			}
		},
	],
	healthPackages: [{
		packageId: {
			type: String
		},
		subscribtionDate: {
			type: Date
		},
		renewalDate: {
			type: Date
		},
		status: {
			type: String,
			enum: HEALTH_PACKAGE_STATUS
		}
	}
	]
});

patientSchema.statics.signup = async function (
	name,
	email,
	password,
	userName,
	dateOfBirth,
	gender,
	mobileNumber,
	emergencyContact
) {
	const salt = await bcrypt.genSalt();
	password = await bcrypt.hash(password, salt);
	const userRecord = new this({
		name,
		email,
		password,
		userName,
		dateOfBirth,
		gender,
		mobileNumber,
		emergencyContact,
		familyMembers: [],
	});
	const result = await userRecord.save();
	return result;
};

const PatientModel = mongoose.model('Patient', patientSchema);

export default PatientModel;
