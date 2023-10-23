import PatientModel from '../models/Patient.js';
import PrescriptionModel from '../models/Prescription.js';
import {
    FAMILY_MEMBERS_PROJECTION,
    PATIENT_ADDRESSES_PROJECTION,
} from '../../utils/Constants.js';

class PatientRepository {
    async findAllPatients() {
        const allPatients = await PatientModel.find();
        return allPatients;
    }
    async findFamilyMembers(id) {
        console.log('id = ', id);
        const familyMembers = await PatientModel.findById(
            id,
            FAMILY_MEMBERS_PROJECTION
        );
        console.log('Family = ', familyMembers);
        return familyMembers;
    }

    async findPatientByUserName(userN) {
        return await PatientModel.findOne({ userName: userN });
    }

    async addFamilyMember(id, familyMembers) {
        return await PatientModel.findOneAndUpdate(
            { _id: id },
            { familyMembers },
            { new: true, runValidators: true }
        ).select(FAMILY_MEMBERS_PROJECTION);
    }

    async findAllPrescriptions() {
        const allPrescriptions = await PrescriptionModel.find();
        return allPrescriptions;
    }

    async findPrescriptionById(id) {
        const prescription = await PrescriptionModel.findById(id);
        return prescription;
    }

    async createPatient(patient) {
        const newPatient = await PatientModel.create(patient);
        return newPatient;
    }

    async deletePatient(id) {
        const deletedPatient = await PatientModel.findByIdAndDelete(id);
        return deletedPatient;
    }

    async signupUser(req) {
        const {
            name,
            email,
            password,
            userName,
            dateOfBirth,
            gender,
            mobileNumber,
            emergencyContact,
        } = req.body;
        const user = await PatientModel.signup(
            name,
            email,
            password,
            userName,
            dateOfBirth,
            gender,
            mobileNumber,
            emergencyContact
        );
        return user;
    }

    async getAddresses(id) {
        const addresses = await PatientModel.findById(
            id,
            PATIENT_ADDRESSES_PROJECTION
        );
        return addresses;
    }

    async addAddress(id, address) {
        const { deliveryAddresses } = await this.getAddresses(id);
        const addresses = [...deliveryAddresses, address];
        console.log(id, address, addresses);
        const newAddresses = await PatientModel.findOneAndUpdate(
            { _id: id },
            { deliveryAddresses: addresses },
            { new: true, runValidators: true }
        ).select(PATIENT_ADDRESSES_PROJECTION);
        return newAddresses;
    }
}

export default PatientRepository;
