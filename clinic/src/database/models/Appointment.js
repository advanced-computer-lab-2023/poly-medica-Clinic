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
	isValid: {
		type: Boolean,
		default: true,
	},
});

const AppointmentModel = mongoose.model('Appointment', Appointment);

export default AppointmentModel;
