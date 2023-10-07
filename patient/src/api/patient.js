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

  app.patch("/add-family-member/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidMongoId(id)) {
      return res
        .status(404)
        .json({ message: "couldn't add a family member, try again later!" });
    }
    try {
      const { name, nationalId, age, gender, relation } = req.body;
      const data = await service.getFamilyMembers(id);
      const newFamilyMem = [
        { name, nationalId, age, gender, relation },
        ...data.familyMembers,
      ];
      console.log(newFamilyMem);
      const newData = await service.addFamilyMember(id, newFamilyMem);
      res.status(200).json(newData);
    } catch (err) {
      res
        .status(500)
        .json({ message: "couldn't add a family member, try again later!" });
    }
  });
};
