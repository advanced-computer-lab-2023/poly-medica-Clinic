import PatientModel from '../models/Patient.js';
import PrescriptionModel from '../models/Prescription.js';
import {
    FAMILY_MEMBERS_PROJECTION,
    ORDER_PROJECTION,
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

    async findOrders(id) {
        const orders = await PatientModel.findById(id, ORDER_PROJECTION);
        return orders;
    }

    async addOrder(id, order) {
        const { orders } = await this.findOrders(id);
        const newOrders = [...orders, order];
        const updatedOrders = await PatientModel.findOneAndUpdate(
            { _id: id },
            { orders: newOrders },
            { new: true, runValidators: true }
        ).select(ORDER_PROJECTION);
        return updatedOrders;
    }

    async updateOrderStatus(patientId, orderId, status) {
        const { orders } = await this.findOrders(patientId);
        orders.forEach((order) => {
            console.log(order, order._id);
            if (order._id.toString() === orderId.toString()) {
                order.status = status;
            }
        });
        const newOrders = await PatientModel.findOneAndUpdate(
            { _id: patientId },
            { orders },
            { new: true, runValidators: true }
        ).select(ORDER_PROJECTION);
        return newOrders;
    }
}

export default PatientRepository;
