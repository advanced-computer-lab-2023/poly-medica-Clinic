import mongoose from 'mongoose';

const HealthPackageOrder = mongoose.Schema({
	price: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	discountOfDoctor: {
		type: Number,
		required: true,
	},
	discountOfMedicin: {
		type: Number,
		required: true,
	},
	discountOfFamily: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ['DONE', 'FAILED']
	}
});

const HealthPackageModel = mongoose.model('HealthPackageOrder', HealthPackageOrder);

export default HealthPackageModel;
