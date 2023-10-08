import PatientService from "../service/patient-service.js";
import {
	EMPTY_SIZE,
	NOT_FOUND_STATUS_CODE,
	UNAUTHORIZED_STATUS_CODE,
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
} from "../utils/Constants.js";

export const patient = (app) => {
	const service = new PatientService();

	app.get("/patients", async (req, res) => {
		try {
			const patients = await service.getAllPatients();
			if (patients.length > EMPTY_SIZE) {
				res.status(OK_STATUS_CODE).json({ patients });
			} else {
				res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ message: "No patients found!" });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post("/patients", async (req, res) => {
		try {
			const newPatient = await service.createPatient(req.body);
			res
				.status(OK_STATUS_CODE)
				.json({ message: "Patient created!", newPatient });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete("/patients/:id", async (req, res) => {
		try {
			const id = req.params.id;
			const role = "ADMIN"; // to be adjusted later` on with the role of the logged in user
			if (role === "ADMIN") {
				const deletedPatient = await service.deletePatient(id);
				if (deletedPatient === null)
					res.json({
						message: "patient not found!",
						status: NOT_FOUND_STATUS_CODE,
					}); // to do: adding the not found status code
				else
					res.json({
						message: "patient deleted!",
						status: OK_STATUS_CODE,
						deleted_patient: deletedPatient,
					});
			} else {
				res.json({
					message: "You are not authorized to delete a patient!",
					status: UNAUTHORIZED_STATUS_CODE,
				});
			}
		} catch (err) {
			res.json({ err: err.message, status: ERROR_STATUS_CODE });
		}
	});
};
