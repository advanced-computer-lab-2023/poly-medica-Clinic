import mongoose from 'mongoose';
import { GENDERS, FAMILY_RELATIONS } from '../../utils/Constants.js';

const Patient = mongoose.Schema({
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
    },
    familyMembers: [
        {
            userName: {
                type: String,
                required: true,
                unique: true,
            },
            name: {
                type: String,
                required: true,
            },
            nationalId: {
                type: String,
                required: true,
                unique: true,
            },
            age: {
                type: Number,
                required: true,
            },
            gender: {
                type: String,
                enum: GENDERS,
                required: true,
            },
            relation: {
                type: String,
                enum: FAMILY_RELATIONS,
                required: true,
            },
        },
    ],
    //.....
});

const PatientModel = mongoose.model('Patient', Patient);

export default PatientModel;
