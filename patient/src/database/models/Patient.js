import mongoose from 'mongoose';
import { FAMILY_RELATIONS, GENDERS } from '../../utils/Constants.js';

const patientSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	userName: {
		type: String,
		required: true,
		unique: true
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},

	dateOfBirth: {
		type: Date,
		required: true
	},
	gender: {
		type: String,
		enum: GENDERS,
		required: true
	},
	mobileNumber: {
		type: String,
		required: true
	},
	emergencyContact: {
		name: {
			type: String,
			required: true
		},
		mobile: {
			type: String,
			required: true
		},
		relation: {
			type: String,
			required: true,
			enum: FAMILY_RELATIONS
		}
	},
	familyMembers: [
		{
			name: {
				type: String,
				required: true
			},
			nationalId: {
				type: String,
				required: true,
				unique: true,
				sparse: true,
			},
			age: {
				type: Number,
				required: true
			},
			gender: {
				type: String,
				enum: GENDERS,
				required: true
			},
			relation: {
				type: String,
				required: true
			}
		}
	]
	//.....
} );

patientSchema.statics.signup = async function (name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact){
	console.log(name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact);
    const userRecord = new this({name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact, familyMembers: []});
    let result = await userRecord.save();
    return result;
}

const PatientModel = mongoose.model('Patient', patientSchema);


export default PatientModel;