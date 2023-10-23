import mongoose from 'mongoose';

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
	//.....
});

const AppointmentModel = mongoose.model('Appointment', Appointment);

export default AppointmentModel;
