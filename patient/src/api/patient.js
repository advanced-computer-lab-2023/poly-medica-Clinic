import mongoose from "mongoose";
import PatientService from "../service/patient-service.js";
import { isValidMongoId } from "../utils/Validation.js";

export const patient = (app) => {
  const service = new PatientService();

  app.get("/all-patients", async (req, res) => {
    const allPatients = await service.getAllPatient();
    if (allPatients.length > 0) {
      res.status(200).json(allPatients);
    } else {
      res.status(404).json({ message: "patients not found" });
    }
  });
};
