import mongoose from "mongoose";
import { GENDERS } from "../../utils/Constants.js";

const Patient = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: GENDERS,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    emergencyContact: {
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        }
    },
    familyMembers: [
        {
            name: {
                type: String,
                required: true
            },
            nationalId: {
                type: String,
                required: true,
                unique: true
            },
            age: {
                type: Number,
                required: true
            },
            gender: {
                type: String,
                enum: GENDERS,
                required: true
            },
            relation: {
                type: String,
                required: true
            }
        }
    ]
    //.....
});

Patient.static.signup = async function (name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact){
    const userRecord = new PatientModel({name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact});
    let result = await userRecord.save();
    return result;
}

const PatientModel = mongoose.model('Patient', Patient);

export default PatientModel;