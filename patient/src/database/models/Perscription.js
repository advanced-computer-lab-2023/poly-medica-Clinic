import mongoose from "mongoose";


const Perscription = mongoose.Schema({
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
    //.....
});

const PerscriptionModel = mongoose.model('Perscription', Perscription);

export default PerscriptionModel;