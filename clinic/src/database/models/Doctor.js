import mongoose from "mongoose";
import UserSchema from "./UserSchema.js";

const Doctor = mongoose.Schema({
    userData: {
        type: UserSchema,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    educationalBackground: {
        type: String,
        required: true
    }
});

Doctor.static.addUser = async function (userData, speciality, hourlyRate, affiliation, educationalBackground){
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
    const newRecord = new AdminModel({userData, speciality, hourlyRate, affiliation, educationalBackground});
    let user = await newRecord.save();
    return user;
};

const DoctorModel = mongoose.model('Doctor', Doctor);

export default DoctorModel;