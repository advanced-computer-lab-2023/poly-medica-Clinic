import mongoose from 'mongoose';
import { FAMILIY_EMERGENCY, GENDERS, HEALTH_PACKAGE_STATUS, FAMILY_RELATIONS, ZERO } from '../../utils/Constants.js';
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
		unique: true,
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
			id: {
				type: String,
				// ref: 'Patient',
				// required: true	
			},
			name: {
				type: String,
			},
			nationalId: {
				type: String,
				//sparse: true,
			},
			age: {
				type: Number,
			},
			gender: {
				type: String,
				enum: GENDERS,
			},
			relation: {
				type: String,
				enum: FAMILY_RELATIONS,
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
	],
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
	deliveryAddresses: [
		{
			city: {
				type: String,
				required: true,
			},
			street: {
				type: String,
				required: true,
			},
			buildingName: {
				type: String,
				required: true,
			},
			phoneNumber: {
				type: String,
				required: true,
			},
			primary: {
				type: Boolean,
				default: false,
			},
		},
	],

	//.....
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
