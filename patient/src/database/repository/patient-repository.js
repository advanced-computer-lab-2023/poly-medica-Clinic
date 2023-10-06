import mongoose from "mongoose";
import PatientModel from "../models/Patient.js";
import PerscriptionModel from "../models/Perscription.js";
import { FAMILY_MEMBERS_PROJECTION } from "../../utils/Constants.js";

class PatientRepository {
  async findAllPatients() {
    const allPatients = await PatientModel.find();
    return allPatients;
  }
}

export default PatientRepository;
