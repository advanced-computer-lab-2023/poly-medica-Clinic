import mongoose from "mongoose";


const HealthPackage = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
  //....
});

const HealthPackageModel = mongoose.model('HealthPackage', HealthPackage);

export default HealthPackageModel;