import mongoose from 'mongoose';
import { FAMILY_RELATIONS, GENDERS } from '../../utils/Constants.js';

const Appointment = mongoose.Schema({
	patientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Patient',
		required: true,
	},
	doctorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Doctor',
		required: true,
	},
	patientName: {
		type: String,
		required: true,
	},
	doctorName: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
	},
	type: {
		type: String,
		enum: ['appointment', 'follow-up'],
		required: true,
	},
	pricePaidByPatient: { // only in case type is appointment
		type: Number
	},
	pricePaidToDoctor: { // only in case type is appointment
		type: Number
	},
	patientFamilyMember: { // if exists
		name: {
			type: String,
		},
		nationalId: {
			type: String,
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
	},
	followUpData: { // only in case type is follow-up (otherise isValid is false)
		isValid: {
			type: Boolean,
			default: false,
		},
		accepted: {
			type: Boolean,
		},
		handled: { // doctor has handled the follow-up (if false then "accepted" is rendered useless)
			type: Boolean,
		}
	},
});

const AppointmentModel = mongoose.model('Appointment', Appointment);

export default AppointmentModel;
