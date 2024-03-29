import mongoose from 'mongoose';

const Prescription = mongoose.Schema({
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
	doctorName: {
		type: String,
	},
	date: {
		type: Date,
		required: true,
	},
	filled: {
		type: Boolean,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	medicines: [
		{
			medicineId: {
				type: mongoose.Schema.Types.ObjectId,
			},
			name: {
				type: String,
			},
			price: {
				type: Number,
			},
			amount: {
				type: Number,
			},
		},
	],
	inCart: {
		type: Boolean,
		default: false,
	},
	purchased: {
		type: Boolean,
		default: false,
	},
});

const PrescriptionModel = mongoose.model('Prescription', Prescription);

export default PrescriptionModel;
