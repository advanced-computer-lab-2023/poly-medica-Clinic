import mongoose from 'mongoose';


const Prescription = mongoose.Schema( {
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
	filled: {
		type: Boolean,
		required: true
	},
	description: {
		type: String,
		required: true
	}
	//.....
} );

const PrescriptionModel = mongoose.model( 'Prescription', Prescription );

export default PrescriptionModel;