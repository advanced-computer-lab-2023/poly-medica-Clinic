import mongoose from 'mongoose';


const HealthPackage = mongoose.Schema({
	price: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	discountOfDoctor: {
		type : Number, 
		required: true
	}, 
	discountOfMedicin: {
		type : Number, 
		required: true
	}, 
	discountOfFamily: {
		type : Number, 
		required: true
	}
});

const HealthPackageModel = mongoose.model('HealthPackage', HealthPackage);

export default HealthPackageModel;