import mongoose from 'mongoose';


const Appointment = mongoose.Schema({
	patientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Patient',
		required: true
	},
	doctorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Doctor',
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	status: {
		type: String,
	},
	//.....
});

const AppointmentModel = mongoose.model('Appointment', Appointment);

export default AppointmentModel;