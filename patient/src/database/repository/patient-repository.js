import PatientModel from '../models/Patient.js';
import { FAMILY_MEMBERS_PROJECTION } from '../../utils/Constants.js';

class PatientRepository {
    async findAllPatients() {
        const allPatients = await PatientModel.find();
        return allPatients;
    }
    async findFamilyMembers(id) {
        const familyMembers = await PatientModel.findById(
            id,
            FAMILY_MEMBERS_PROJECTION
        );
        return familyMembers;
    }
}

export default PatientRepository;
