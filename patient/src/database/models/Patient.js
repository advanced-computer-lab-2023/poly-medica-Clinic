import mongoose from 'mongoose';
import { FAMILIY_EMERGENCY, GENDERS, FAMILY_RELATIONS } from '../../utils/Constants.js';
import bcrypt from 'bcrypt';

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    userName: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: GENDERS,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    emergencyContact: {
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        relation: {
            type: String,
            required: true,
            enum: FAMILIY_EMERGENCY,
        },
    },
    familyMembers: [
        {
            name: {
                type: String,
            },
            nationalId: {
                type: String,
                unique: true,
                sparse: true,
            },
            age: {
                type: Number,
            },
            gender: {
                type: String,
                enum: GENDERS,
            },
            relation: {
                type: String,
                enum: FAMILY_RELATIONS,
            },
            patientId: {
                type: mongoose.Schema.Types.ObjectId,
            },
        },
    ],
    healthrecords: [
        {
            healthIssue: {
                type: String,
                required: true,
            },
            healthIssueDate: {
                type: Date,
                required: true,
            },
            healthIssueDescription: {
                type: String,
                required: true,
            },
        },
    ],
    deliveryAddresses: [
        {
            city: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
            buildingName: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
            primary: {
                type: Boolean,
                default: false,
            },
        },
    ],

    //.....
});

patientSchema.statics.signup = async function (
    name,
    email,
    password,
    userName,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContact
) {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const userRecord = new this({
        name,
        email,
        password,
        userName,
        dateOfBirth,
        gender,
        mobileNumber,
        emergencyContact,
        familyMembers: [],
    });
    const result = await userRecord.save();
    return result;
};

const PatientModel = mongoose.model('Patient', patientSchema);

export default PatientModel;
